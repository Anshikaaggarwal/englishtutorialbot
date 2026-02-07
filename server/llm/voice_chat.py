import os
from dotenv import load_dotenv

from fastapi import FastAPI
from pydantic import BaseModel

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# ---------------- ENV ----------------
# This loads server/.env
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise RuntimeError(
        "GOOGLE_API_KEY is missing. Add it to server/.env"
    )

# ---------------- APP ----------------
app = FastAPI()

# ---------------- LLM ----------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=GOOGLE_API_KEY,
    temperature=0.7,
)

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a friendly English tutor. "
        "Keep replies simple and encouraging. "
        "Always respond in English."
    ),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

chain = prompt | llm

# ---------------- MEMORY ----------------
store = {}

def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

chat_chain = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

# ---------------- API ----------------
class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"

@app.post("/chat")
def chat(req: ChatRequest):
    result = chat_chain.invoke(
        {"input": req.message},
        config={"configurable": {"session_id": req.session_id}},
    )

    return {
        "reply": result.content
    }
