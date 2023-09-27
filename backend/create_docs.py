import json
import os
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

SCOPES = ['https://www.googleapis.com/auth/documents']

def generate_google_docs_from_json(json_data):
    """Generates Google Docs from JSON data.

    Args:
    json_data: A JSON string containing an array of objects for each document.

    Returns:
    A list of Google Doc links.
    """

    #print("Inside Function")
    # Load environment variables from .env file
    #   load_dotenv()
    #   API_KEY = os.getenv("GOOGLE_DOCS_API_KEY")
    #print(API_KEY)

    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    # Create a Google Docs service object.
    service = build('docs', 'v1', credentials=creds)

    # Iterate over the JSON data and generate a Google Doc for each object.
    google_doc_links = []
    for document in json.loads(json_data):
        # Create a new Google Doc.
        #print(document)
        new_doc = service.documents().create(body = {'title': document['title']}).execute()

        # Get the document ID.
        document_id = new_doc['documentId']

        # Set the document title.
        #service.documents().patch(documentId=document_id, body={'title': document['title']}).execute()

        #print(new_doc)

        #print(service)
        # Set the document content.
        # content = document['content']
        # document_content = io.StringIO(content)
        # result = service.documents().batchUpdate(documentId=document_id, body={'documentContent': document_content.read()}).execute()

        #print(result)
        #print(document['documentContent']['body']['content'])
        result = service.documents().batchUpdate(documentId=document_id, body={'requests': document['documentContent']}).execute()

        # Get the Google Doc link.
        google_doc_link = 'https://docs.google.com/document/d/{}/edit?usp=sharing'.format(document_id)

        # Add the Google Doc link to the list of links.
        google_doc_links.append(google_doc_link)

    # Return the list of Google Doc links.
    #print(google_doc_links)
    return google_doc_links

if __name__ == "__main__":
    # Read the JSON data from the file.
    with open('data.json') as json_file:
        json_data = json_file.read()
    
    # Generate Google Docs from the JSON data.
    google_doc_links = generate_google_docs_from_json(json_data)
    
    # Print the Google Doc links.
    print(google_doc_links)