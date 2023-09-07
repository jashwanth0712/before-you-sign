from fastapi import Request, FastAPI, HTTPException, status,  Depends, HTTPException, status, APIRouter, Response
from fastapi_sessions.session_verifier import SessionVerifier
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters
from fastapi.middleware.cors import CORSMiddleware
from action_model import action_function
from BaseModels import ActionItems, ScrapedData, SessionData, BasicVerifier
from uuid import UUID,uuid4
from random import randint
from fastapi_sessions.backends.implementations import InMemoryBackend


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

scraped_data = "WHEREAS, the Parties were lawfully married on the 28th day of June, 2010, \
    in Springfield, Illinois, and have subsequently experienced irreconcilable differences \
    leading to their decision to seek a divorce;\
    WHEREAS, the Parties desire to amicably settle all issues arising from their marriage, including property division, spousal support, child custody, child support, and other related matters;\
    NOW, THEREFORE, in consideration of the premises and mutual covenants contained herein, the Parties agree as follows:\
    PROPERTY DIVISION\
1.1 Real Property: The marital home located at 123 Oak Street, Springfield, Illinois, shall be awarded to Wife. Husband shall execute any necessary documents to transfer the title and interest to Wife. Husband shall retain ownership of the vacation property situated at 456 Pine Avenue, Lakeview, Michigan.\
1.2 Personal Property: The Parties shall equitably divide personal property, household items, and vehicles through a collaborative process within 60 days of the execution of this Agreement.\
1.3 Financial Assets: The Parties shall divide financial assets (bank accounts, investments, retirement accounts) as follows:\
Husband shall retain his retirement account with WealthBank.\
Wife shall retain her retirement account with InvestCorp.\
Joint savings accounts shall be equally divided between the Parties."

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
    return "Hello Dropbox!"


@app.post("/action", response_model=ActionItems)
def action_items():
    print("Processing the action items with data: \n", str(scraped_data))
    sentences = action_function(scraped_data)
    print(len(sentences))
    return {"data": sentences}

# @app.post("/create_session")
# async def create_session(response: Response):
#     user_session = uuid4()
#     # generate a random integer between 0 and 100
#     # random_int = randint(0, 100)
#     lawyer_data = [f"This is a test {randint(0, 100)}", "This is another test"]
#     data = SessionData(data=lawyer_data)
#     await session_backend.create(user_session, data)
#     cookie.attach_to_response(response, user_session)

#     return "Session created successfully"

# @app.get("/session_data", dependencies=[Depends(cookie)])
# async def whoami(session_data: SessionData = Depends(verifier)):
    
#     return session_data

# @app.post("/delete_session")
# async def del_session(response: Response, session_id: UUID = Depends(cookie)):
#     await session_backend.delete(session_id)
#     cookie.delete_from_response(response)
#     return "deleted session"

@app.post("/lawyer")
async def lawyer(user_data: str, response: Response, session_id: UUID = Depends(cookie)):
    # Delete the existing session
    existing_session_data = await session_backend.read(session_id)
    
    if existing_session_data is not None:
        # Session already exists, update the data
        existing_data = existing_session_data.data
        gpt_data = f"some data {randint(0, 100)}"
        existing_data.extend([[1,user_data],[0,gpt_data]])
        await session_backend.update(session_id, SessionData(data=existing_data))
        print("Updated session successfully")
        # Retrieve and return the session data
        session_data = await session_backend.read(session_id)
        # print(session_data)
        # gpt_data = f"some data {randint(0, 100)}"
        return session_data
    else:
        # Session doesn't exist, create a new session
        
        gpt_data = f"some gpt data by our model {randint(0, 100)}"
        init_data = (0,gpt_data)
        user_session = uuid4()
        new_data = SessionData(data=[init_data])
        await session_backend.create(user_session, new_data)
        cookie.attach_to_response(response, user_session)
        print("Created new session successfully")
        # Retrieve and return the session data
        # print(init_data)
        # gpt_data = f"some data {randint(0, 100)}"
        return init_data

