import base64
import os
from typing import List

import aiofiles
from click import prompt
from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
from sqlalchemy.orm import Session
from typing_extensions import Optional, Annotated

from ..database import get_session
from .schemas import AssistantCreate, AssistantUpdate, ChatRequest, Source, SourceCreate, SourceUpdate, RequestData, \
    Item
from .rag_bot import RAGChatBot
from .crud import CRUDSource, CRUDAssistant

data_sources = [
    ('url', 'https://t1.ru/'),
]

bot_settings = {}

# model_name = "Qwen/Qwen2.5-0.5B-Instruct"
bot = RAGChatBot(data_sources, from_huggingface=False, gigachat_api_key=os.getenv("GIGACHAT_API_KEY"))


UPLOAD_DIR = 'uploaded_files'
os.makedirs(UPLOAD_DIR, exist_ok=True)

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


@router.post("/addServicesAndPrompt")
async def upload_file(request_data: RequestData):
    sources_to_load = []
    for service_type, urls in request_data.services.dict().items():
        if urls:
            for url in urls:
                sources_to_load.append(('url', url))
    bot.add_sources(sources_to_load)
    bot.change_prompt(request_data.prompt.value)

    return {"results": f"services and prompt added"}

@router.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    sources_to_load = []
    for file in files:
        async with aiofiles.open(f"{UPLOAD_DIR}/{file.filename}", 'wb') as out_file:
            content = await file.read()  # async read
            await out_file.write(content)  # async write
            sources_to_load.append(('file', f"{UPLOAD_DIR}/{file.filename}"))
    bot.add_sources(sources_to_load)
    return {"result": "files were loaded"}


