
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..database import get_session
from schemas import ChatRequest
from rag_bot import RAGChatBot

data_sources = [
    ('service', 'https://t1.ru/'),
]

model_name = "google/gemma-2-9b-it"
bot = RAGChatBot(data_sources, model_name=model_name)

router = APIRouter(
    prefix='/config'
)

@router.get('/sources')
def get_list_sources(db: Session = Depends(get_session)):
    pass

@router.post('/sources')
def add_source():
    pass

@router.put('/sources/{id_source}')
def change_source(id_source: int):
    pass

@router.delete('/sources/{id_source}')
def delete_source(id_source: int):
    pass

@router.get('/assistants')
def get_assistants():
    pass

@router.get('/assistants/{id_assistant}')
def get_assistant_by_id(id_assistant: int):
    pass

@router.post('/assistants')
def save_assistant():
    pass

@router.patch('/assistants/{id_assistant}')
def change_settings_assistant(id_assistant: int):
    pass

@router.delete('/assistants/{id_assistant}')
def delete_assistant(id_assistant: int):
    pass

@router.get('/assistants/{id_assistant}/export')
def get_code_assistant(id_assistant: int):
    pass

@router.get('/llm')
def get_all_llm_models():
    pass

@router.get('/llm/{id_llm}/settings')
def get_settings_llm_by_id(id_llm: int):
    pass

@router.patch('/llm/{id_llm}/settings')
def change_settings_llm_by_id(id_llm: int):
    pass

@router.post('/chat')
def chat(request: ChatRequest):
    try:
        answer, source_docs = bot.chat(request.question)
        return {'answer': answer, "source_documents": source_docs}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))