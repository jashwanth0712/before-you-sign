from fastapi import Response, FastAPI, HTTPException, Depends, HTTPException, Body,File, UploadFile
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sessions.backends.implementations import InMemoryBackend
from uuid import UUID,uuid4
from action_model import action_function
from BaseModels import SessionData, BasicVerifier, Base64, Email, Prompt
from OCR import base64_to_text
from chat_with_bot import chat_with_openai
import os,base64,json
import tempfile
from emails import send_reminder_emails
from create_legal_document_palm import create_legal_document
from create_docs import generate_google_docs_from_markdown
from typing import Annotated
import requests
from google.cloud import storage
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

@app.post("/action", status_code=201)
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
    return (sentences,text_from_image)


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
    AUTH_CALLBACK_URL ="http://localhost:8000/callback"
    SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive']
    global flow
    flow = Flow.from_client_config(
    creds_json,
    scopes=SCOPES,
    redirect_uri=AUTH_CALLBACK_URL)
    return flow.authorization_url()[0]

@app.post("/generate", response_model=str, status_code=200)
def generate_doc(prompt: Prompt):
    global flow,access_token,creds
    print("Chatting with PaLM to generate legal document\n")
    legal_doc_data = create_legal_document(prompt.data)
    print("Chat with PaLM completed\n")
    return generate_google_docs_from_markdown(legal_doc_data,creds)

@app.get("/callback")
def callback(state,code):
    print(state,code)
    global flow,access_token,creds
    access_token = flow.fetch_token(code=code)
    creds = flow.credentials
    return "Authentication is successful! Please close this window to proceed!"


@app.post("/clear_session")
async def clear_user_session(session_id: UUID = Depends(cookie)):
    try:
        await session_backend.delete(session_id)
        print("Session cleared successfully\n")
        return "Session cleared successfully"
    except Exception as e:
        print("Session does not exist\n")

@app.post("/audio")
async def put_audio(file: UploadFile = File(...),exp_time: int | None = 3600):
    """ Uploads the file from Creates a signed URL for an object in a Google Cloud Storage bucket.

    Args:
        file : a uniquely named mp3 audio file
        expiration_time: The expiration time for the signed URL in seconds.

    Returns:
        A signed URL for the object which can be "curl-ed" or opened in a browser to download the file
    """
    bucket_name = os.getenv("BUCKET_NAME")
    try:
        contents = file.file.read()
        with open(file.filename, 'wb') as f:
            f.write(contents)
        print("File written successfully")
    except Exception:
        return {"message": "There was an error uploading the file. Please try again"}
    finally:
        file.file.close()
    storage_client = storage.Client()
    object_name = file.filename
    blob = storage_client.bucket(bucket_name).blob(object_name)

    # upload the file to s3 bucket
    with open(file.filename, "rb") as f:
        f.seek(0)
        content = f.read()
        audio_data_bytes = bytearray(content)
        print(type(audio_data_bytes))
        f.seek(0)
        blob.upload_from_file(f)
        

    f.close()
    
    print("File uploaded to {}.".format(bucket_name))
    bucket_creds = os.getenv("BUCKET_CREDENTIALS")
    s3_creds = base64.b64decode(bucket_creds.encode('utf-8') + b'==').decode('utf-8')
    print(s3_creds)
    with open("file.json","wb") as creds_file:
        creds_file.write(s3_creds.encode('utf-8'))
        creds_file.seek(0)
        storage_client = storage.Client.from_service_account_json(creds_file.name)
        blob = storage_client.bucket(bucket_name).blob(object_name)

        signed_url = blob.generate_signed_url(
            expiration=exp_time, version="v4", method="GET"
        )
        doc = requests.get(signed_url)
        with open('from_bucket.mp3', 'wb') as f:
            f.write(doc.content)
            print("Audio successfully Fetched from the URL\n")
        return signed_url