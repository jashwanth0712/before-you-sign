from fastapi import Response, FastAPI, HTTPException, Depends, HTTPException
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sessions.backends.implementations import InMemoryBackend
from uuid import UUID,uuid4
from action_model import action_function
from BaseModels import ActionItems,SessionData, BasicVerifier, Base64
from OCR import base64_to_text
from chat_with_bot import chat_with_openai

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
    secret_key="DONOTUSE",
    cookie_params=cookie_params,
)


session_backend = InMemoryBackend[UUID, SessionData]()


verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=session_backend,
    auth_http_exception=HTTPException(status_code=403, detail="invalid session"),
)

@app.get("/")
def base_URL():
    return "Hello Dropbox!\n"

@app.post("/base64", response_model=ActionItems)
def get_image(image:Base64):
    global text_from_image
    text_from_image = base64_to_text(image.image)
    sentences = action_function(text_from_image)
    return {"data": sentences}


@app.post("/lawyer", response_model=str)
async def lawyer(user_data: str, response: Response,legal_document:str | None = None,  session_id: UUID = Depends(cookie)):
    # Delete the existing session
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
        new_data = SessionData(data=[init_data],document=legal_document)
        await session_backend.create(user_session, new_data)
        cookie.attach_to_response(response, user_session)
        print("Created new session successfully\n")
        return init_data[-1]

