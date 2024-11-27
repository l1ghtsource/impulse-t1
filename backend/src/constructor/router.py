
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from ..database import get_session
from .schemas import AssistantCreate, AssistantUpdate, ChatRequest, LLMCreate, LLMUpdate, Source, SourceCreate, SourceUpdate
from .rag_bot import RAGChatBot
from .crud import CRUDLlm, CRUDSource, CRUDAssistant

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
    sources = CRUDSource.get_sources(db)
    return sources

@router.post('/sources')
def add_source(source: SourceCreate, db: Session = Depends(get_session)):
    new_source = CRUDSource.create_source(db, source)
    return new_source

@router.put('/sources/{id_source}')
def change_source(id_source: int, source_update: SourceUpdate, db: Session = Depends(get_session)):
    updated_source = CRUDSource.update_source(db, id_source, source_update)
    if not updated_source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found!")
    return updated_source

@router.delete('/sources/{id_source}')
def delete_source(id_source: int, db: Session = Depends(get_session)):
    deleted_source = CRUDSource.delete_source(db, id_source)
    if not deleted_source:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Source not found")
    return deleted_source

@router.get('/assistants')
def get_assistants(db: Session = Depends(get_session)):
    assistants = CRUDAssistant.get_assistants(db)
    return assistants

@router.get('/assistants/{id_assistant}')
def get_assistant_by_id(id_assistant: int, db: Session = Depends(get_session)):
    assistant = CRUDAssistant.get_assistant(db, id_assistant)
    if not assistant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Assistant not found')
    return assistant

@router.post('/assistants')
def save_assistant(assistant: AssistantCreate, db: Session = Depends(get_session)):
    new_assistant = CRUDAssistant.create_assistant(db, assistant)
    return new_assistant

@router.patch('/assistants/{id_assistant}')
def change_settings_assistant(id_assistant: int, assistant_update: AssistantUpdate, db: Session = Depends(get_session)):
    updated_assistant = CRUDAssistant.update_assistant(db, id_assistant, assistant_update)
    if not updated_assistant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Assistant not found')
    return updated_assistant

@router.delete('/assistants/{id_assistant}')
def delete_assistant(id_assistant: int, db: Session = Depends(get_session)):
    deleted_assistant = CRUDAssistant.delete_assistant(db, id_assistant)
    if not deleted_assistant:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Assistant not found')
    return delete_assistant

@router.get('/assistants/{id_assistant}/export')
def get_code_assistant(id_assistant: int):
    pass

@router.get('/llm')
def get_all_llm_models(db: Session = Depends(get_session)):
    llms = CRUDLlm.get_all_llm(db)
    return llms

@router.post('/llm')
def add_llm_model(llm: LLMCreate, db: Session = Depends(get_session)):
    new_llm = CRUDLlm.create_llm(db, llm)
    return new_llm

@router.get('/llm/{id_llm}/settings')
def get_settings_llm_by_id(id_llm: int, db: Session = Depends(get_session)):
    llm = CRUDLlm.get_llm_by_id(db, id_llm)
    if not llm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Llm not found')
    return llm

@router.patch('/llm/{id_llm}/settings')
def change_settings_llm_by_id(id_llm: int, llm_update: LLMUpdate, db: Session = Depends(get_session)):
    updated_llm = CRUDLlm.update_llm(db, id_llm, llm_update)
    if not updated_llm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Llm not found')
    return updated_llm

@router.post('/chat')
def chat(request: ChatRequest):
    try:
        answer, source_docs = bot.chat(request.question)
        return {'answer': answer, "source_documents": source_docs}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))