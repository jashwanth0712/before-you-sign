import json
import base64
import os
import re
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from dotenv import load_dotenv

markdown_sample_text = """
# Rental Agreement

This Rental Agreement (the "Agreement") is made and entered into on this __day of __month, __year, (the "Effective Date") between the landlord, [your name], (the "Landlord") and the tenant, Sasank, (the "Tenant").

## 1. Property Details

The Landlord agrees to rent the following property to the Tenant:

- Address: [Property Address]
- City: [City]
- State: [State]
- Postal Code: [Postal Code]

## 2. Term of Lease

The term of this lease agreement shall be for a period of _6 months_, commencing on the __day of __month, __year, and terminating on the __day of __month, __year (the "Lease Term").

## 3. Rent

The Tenant agrees to pay a monthly rent of _5000 USD_ to the Landlord. Rent shall be due on the _1st_ day of each month. Payment shall be made in the form of _[payment method]_.

## 4. Security Deposit

The Tenant shall provide a security deposit of _10000 USD_ to the Landlord. This deposit shall be held by the Landlord as security for the Tenant's obligations under this Agreement, including any damages to the property beyond normal wear and tear. The security deposit will be returned to the Tenant within _[number of days]_ after the termination of this Agreement, less any deductions for damages or unpaid rent.

## 5. Maintenance and Repairs

The Tenant shall maintain the property in a clean and sanitary condition and promptly notify the Landlord of any necessary repairs or maintenance. The Tenant shall be responsible for any damages caused by their negligence or misuse of the property.

## 6. Termination

Either party may terminate this Agreement before the end of the Lease Term by providing a written notice of _[number of days]_ days. In the event of early termination by the Tenant, the Tenant shall remain liable for the rent until the end of the notice period or until a new tenant is found, whichever occurs first.

## 7. Governing Law

This Agreement shall be governed by and construed in accordance with the laws of the state of [State]. Any disputes arising under or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of [City], [State].

## 8. Entire Agreement

This Agreement constitutes the entire agreement between the Landlord and the Tenant and supersedes all prior agreements, understandings, and representations. Any modifications to this Agreement must be in writing and signed by both parties.

IN WITNESS WHEREOF, the Landlord and the Tenant have executed this Rental Agreement as of the Effective Date.

Landlord:
[Your Name]
[Your Address]
[City], [State]
[Phone Number]
[Email Address]

Tenant:
Sasank
[Tenant's Address]
[City], [State]
[Phone Number]
[Email Address]
"""

SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive']

def generate_google_docs_from_json(json_data):
    """Generates Google Docs from JSON data.

    Args:
    json_data: A JSON string containing an array of objects for each document.

    Returns:
    A list of Google Doc links.
    """

    #print("Inside Function")
    # Load environment variables from .env file
    load_dotenv()
    Credentials = os.getenv("GOOGLE_DOCS_CREDENTIALS")
    #print(Credentials)
    #print(base64.b64decode(Credentials.encode('utf-8')).decode('utf-8'))
    creds_json = base64.b64decode(Credentials.encode('utf-8')).decode('utf-8')
    #print(type(creds_json))
    #print(json.loads(creds_json))

    creds = None
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_config(
            json.loads(creds_json), SCOPES) 
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        # with open('token.json', 'w') as token:
        #     token.write(creds.to_json())

    # Create a Google Docs service object.
    service = build('docs', 'v1', credentials=creds)
    # Create a google drive service object.
    drive_service = build('drive', 'v3', credentials=creds)

    # Iterate over the JSON data and generate a Google Doc for each object.
    google_doc_links = []
    for document in json.loads(json_data):
        # Create a new Google Doc.
        #print(document)
        new_doc = service.documents().create(body = {'title': document['title']}).execute()

        # Get the document ID.
        document_id = new_doc['documentId']

        #print(result)
        #print(document['documentContent']['body']['content'])
        result = service.documents().batchUpdate(documentId=document_id, body={'requests': document['documentContent']}).execute()

        # Get the Google Doc link.
        google_doc_link = 'https://docs.google.com/document/d/{}/edit?usp=sharing'.format(document_id)

        # Define the permissions for the document
        permissions = {
            'role': 'reader',
            'type': 'anyone',
        }

        # Create a permission for 'anyone with the link' (public visibility)
        permission = drive_service.permissions().create(fileId=document_id, body=permissions).execute()

        # Get the publicly accessible link
        # file_info = drive_service.files().get(fileId=document_id, fields='webViewLink').execute()
        # print(file_info.get('webViewLink'))

        # Add the Google Doc link to the list of links.
        google_doc_links.append(google_doc_link)

    # Return the list of Google Doc links.
    return google_doc_links

# Define a function to insert text
def insert_text(text, index):
    return {
        "insertText": {
            "location": {
                "index": index,
            },
            "text": text,
        }
    }

# Define a function to insert text with specific formatting with start and end index
def update_text_with_format(format, start_index, end_index):
    return {
        "updateTextStyle": {
            "range": {
                "startIndex": start_index,
                "endIndex": end_index,
            },
            "textStyle": format,
            "fields": "*",
        }
    }

def generate_google_docs_from_markdown(markdown_text,creds):
    """Generates Google Docs from Markdown text.

    Args:
    markdown_text: A string containing Markdown text.

    Returns:
    A string containing the Google Doc link.
    """
    # load_dotenv()
    # Credentials = os.getenv("GOOGLE_DOCS_CREDENTIALS")
    # creds_json = base64.b64decode(Credentials.encode('utf-8') + b'==').decode('utf-8')
    # flow = InstalledAppFlow.from_client_config(
    # json.loads(creds_json), SCOPES) 
    # creds = flow.run_local_server(port=0)
    # # Create a Google Docs service object.
    service = build('docs', 'v1', credentials=creds)
    # Create a google drive service object.
    drive_service = build('drive', 'v3', credentials=creds)
    # Split the markdown text into sections based on headings
    sections = re.split(r'(^#{1,6} .*$)', markdown_text, flags=re.MULTILINE)

    # print(sections)

    # Extract the title from the first line
    title = sections[1].strip().replace('#', '')
    #title += '\n'

    #print(title)

    # Create a new Google Doc.
    new_doc = service.documents().create(body = {'title': title}).execute()

    # Get the document ID.
    document_id = new_doc['documentId']

    # Initialize the index to 1
    current_index = 1

    # print(insert_text(title,current_index))

    # service.documents().batchUpdate(
    #     documentId=document_id,
    #     body={"requests": [insert_text(title,current_index)]}
    # ).execute()

    # service.documents().batchUpdate(
    #     documentId=document_id,
    #     body={"requests": [update_text_with_format({"fontSize": {"magnitude": 32, "unit": "PT"}, "bold": True}, current_index, current_index + len(title))]}
    # ).execute()

    # Update the current index based on the length of the title
    #current_index += len(title) - 1 

    # Iterate over the sections and add them to the Google Doc
    for i in range(1, len(sections), 2):
        # Extract the heading level and text
        heading_level = sections[i].count('#')
        heading_text = sections[i].strip().replace('#', '')
        heading_text += '\n'

        # Determine text formatting based on heading level
        if heading_level == 1:
            format = {"fontSize": {"magnitude": 24, "unit": "PT"}, "bold": True}
        elif heading_level == 2:
            format = {"fontSize": {"magnitude": 18, "unit": "PT"}, "bold": True}
        else:
            format = {"bold": True}

        # Insert the heading
        service.documents().batchUpdate(
            documentId=document_id,
            body={"requests": [insert_text(heading_text, current_index)]}
        ).execute()

        # Update the text formatting
        service.documents().batchUpdate(
            documentId=document_id,
            body={"requests": [update_text_with_format(format, current_index, current_index + len(heading_text))]}
        ).execute()

        # Update the current index based on the length of the previous line
        current_index += len(heading_text) # Add 1 for the newline
        if(i+1 < len(sections)):
            # Insert the content of the section
            content_text = sections[i + 1].strip().replace('#', '')
            content_text += "\n"
        
            service.documents().batchUpdate(
                documentId=document_id,
                body={"requests": [insert_text(content_text,current_index)]}
            ).execute()

            # update the text formatting
            service.documents().batchUpdate(
                documentId=document_id,
                body={"requests": [update_text_with_format({"fontSize": {"magnitude": 12, "unit": "PT"}}, current_index, current_index + len(content_text))]}
            ).execute()

            current_index += len(content_text) # Add 1 for the newline

    # Get the Google Doc link.
    google_doc_link = 'https://docs.google.com/document/d/{}/edit?usp=sharing'.format(document_id)

    # Define the permissions for the document
    permissions = {
        'role': 'reader',
        'type': 'anyone',
    }

    # Create a permission for 'anyone with the link' (public visibility)
    permission = drive_service.permissions().create(fileId=document_id, body=permissions).execute()

    return google_doc_link


# if __name__ == "__main__":
    # # Read the JSON data from the file.
    # with open('data.json') as json_file:
    #     json_data = json_file.read()
    
    # # Generate Google Docs from the JSON data.
    # google_doc_links = generate_google_docs_from_json(json_data)
    
    # # Print the Google Doc links.
    # print(google_doc_links)
    # print(generate_google_docs_from_markdown(markdown_sample_text))

# The linke generated can be used as it is in the iframe
# Format:
# <iframe src="https://docs.google.com/document/d/<document_id>/edit?usp=sharing" width="100%" height="500"></iframe>
# Example: 
# <iframe src="https://docs.google.com/document/d/1LGHoUREcYT3nelcBjgu4fCXKHENVei7PHx4cYEEHe9o/edit?usp=sharing" width="100%" height="500"></iframe>