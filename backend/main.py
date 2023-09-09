from fastapi import Request, FastAPI, HTTPException, status,  Depends, HTTPException, status, APIRouter, Response
from fastapi_sessions.session_verifier import SessionVerifier
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from fastapi.middleware.cors import CORSMiddleware
from action_model import action_function
from BaseModels import ActionItems, ScrapedData, SessionData, BasicVerifier, Base64
from uuid import UUID, uuid4
from OCR import base64_to_text
from fastapi_sessions.backends.implementations import InMemoryBackend
from chat_with_bot import chat_with_openai

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # read sample.txt file and store the contents in scraped_data without using with
# with open("sample.txt", "r") as f:
#     global scraped_data
#     scraped_data = f.read()

# print("Scraped data is: \n", scraped_data)

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
    auth_http_exception=HTTPException(
        status_code=403, detail="invalid session"),
)


@app.get("/")
def base_URL():
    return "Hello Dropbox!"


@app.post("/base64")
def get_image(image: Base64):
    global text_from_image
    #print(image)
    text_from_image = base64_to_text(image.image)
    print()
    sentences = action_function(text_from_image)
    return {"data": sentences}

# @app.post("/action", response_model=ActionItems)
# def action_items(scraped_data:str):
#     print("Processing the action items with data: \n", str(scraped_data))
#     sentences = action_function(scraped_data)
#     print(len(sentences))
#     return {"data": sentences}


@app.post("/lawyer", response_model=str)
async def lawyer(user_data: str, response: Response, legal_document: str | None = None,  session_id: UUID = Depends(cookie)):
    # Delete the existing session
    existing_session_data = await session_backend.read(session_id)

    if existing_session_data is not None:
        # Session already exists, update the data
        existing_data = existing_session_data.data
        existing_data.extend([(1, user_data)])
        gpt_data = chat_with_openai(
            existing_data, existing_session_data.document)
        existing_data.extend([(0, gpt_data)])
        await session_backend.update(session_id, SessionData(data=existing_data, document=existing_session_data.document))
        print("Updated session successfully")
        # Retrieve and return the session data
        session_data = await session_backend.read(session_id)
        # print(session_data)
        # gpt_data = f"some data {randint(0, 100)}"
        return existing_data[-1][-1]
    else:
        # Session doesn't exist, create a new session

        gpt_data = chat_with_openai([], legal_document)
        init_data = (0, gpt_data)
        user_session = uuid4()
        new_data = SessionData(data=[init_data], document=legal_document)
        await session_backend.create(user_session, new_data)
        cookie.attach_to_response(response, user_session)
        print("Created new session successfully")
        # Retrieve and return the session data
        # print(init_data)
        # gpt_data = f"some data {randint(0, 100)}"
        return init_data[-1]
