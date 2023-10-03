from fastapi import Response, FastAPI, HTTPException, Depends, HTTPException, Body
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sessions.backends.implementations import InMemoryBackend
from uuid import UUID,uuid4
from action_model import action_function
from BaseModels import SessionData, BasicVerifier, Base64, Email, Prompt
from OCR import base64_to_text
from chat_with_bot import chat_with_openai
import os,base64,json
from emails import send_reminder_emails
from create_legal_document import create_legal_document
from create_docs import generate_google_docs_from_markdown
from typing import Annotated
from google_auth_oauthlib.flow import Flow


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


cookie_params = CookieParameters()

cookie = SessionCookie(
    cookie_name="cookie",
    identifier="general_verifier",
    auto_error=False,
    secret_key="VERYSECRETKEY...",
    cookie_params=cookie_params,
)


session_backend = InMemoryBackend[UUID, SessionData]()


verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=session_backend,
    auth_http_exception=HTTPException(
        status_code=403, detail="invalid session"),
)


@app.get("/")
def base_URL():
    return "Hello Dropbox!\n"

@app.post("/action", response_model=list[str], status_code=201)
def get_image(image:Base64):
    # store start time
    # start_time = time.time()
    global text_from_image
    #print(image)
    text_from_image = base64_to_text(image.image)
    # base64_time = time.time() - start_time
    # print("Time taken for base64 to text conversion: ", base64_time)
    # start_time = time.time()
    sentences = action_function(text_from_image)
    # gpt_time = time.time() - start_time
    # print("Time taken for GPT-3 to generate action sentences is: ", gpt_time)
    return sentences


@app.post("/lawyer", response_model=str, status_code=201)
async def lawyer(user_data:Annotated[str, Body()], response: Response, legal_document: Annotated[str, Body()] = None,  session_id: UUID = Depends(cookie)):
    existing_session_data = await session_backend.read(session_id)

    if existing_session_data is not None:
        # Session already exists, update the data
        existing_data = existing_session_data.data
        existing_data.extend([(1,user_data)])
        gpt_data = chat_with_openai(existing_data,existing_session_data.document)
        existing_data.extend([(0,gpt_data)])
        await session_backend.update(session_id, SessionData(data=existing_data,document=existing_session_data.document))
        print("Updated session successfully\n")
        # Retrieve and return the session data
        session_data = await session_backend.read(session_id)
        return existing_data[-1][-1]
    else:
        # Session doesn't exist, create a new session
        gpt_data = chat_with_openai([],legal_document)
        init_data = (0,gpt_data)
        user_session = uuid4()
        new_data = SessionData(data=[init_data], document=legal_document)
        await session_backend.create(user_session, new_data)
        cookie.attach_to_response(response, user_session)
        print("Created new session successfully\n")
        return init_data[-1]
    
@app.post("/remind", response_model=str, status_code=200)
def remind(signature_id:str, mail_list: Email):
    ack = send_reminder_emails(mail_list.emails,signature_id)
    if ack:
        return "Reminder emails sent successfully\n"
    else:
        return "Unable to send emails. Please Try again\n"

@app.post("/auth", response_model=str, status_code=200)
def auth_google():
    Credentials = os.getenv("GOOGLE_DOCS_CREDENTIALS")
    creds_json = base64.b64decode(Credentials.encode('utf-8') + b'==').decode('utf-8')
    creds_json = json.loads(creds_json)
    AUTH_CALLBACK_URL ="https://dropbox-4zxc4m7upa-el.a.run.app/callback"
    SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive']
    global flow
    flow = Flow.from_client_config(
    creds_json,
    scopes=SCOPES,
    redirect_uri=AUTH_CALLBACK_URL)
    return flow.authorization_url()[0]

@app.post("/generate", response_model=str, status_code=200)
def generate_doc(prompt: Prompt):
    global flow,access_token,creds,md
    # legal_doc_data = create_legal_document(prompt.data)
    return generate_google_docs_from_markdown(md,creds)

@app.get("/callback")
def callback(state,code):
    print(state,code)
    global flow,access_token,creds,md
    access_token = flow.fetch_token(code=code)
    creds = flow.credentials
    md = """
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
    return "You may close this window now."