
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import UploadFile
from pydantic import BaseModel, Field

class AssistantBase(BaseModel):
    name: str = Field(title='Название ассистента')
    id_llm: int = Field(title='id llm-модели')
    id_retriever: int = Field(title='id ретривера')

    input_type: str = Field(title='Тип входа')
    prompt: str = Field(title='Промпт модели')
    settings: Dict[str, Any] = Field(title='Настройки') 

class AssistantCreate(AssistantBase):
    pass

class AssistantUpdate(BaseModel):
    name: str | None = Field(default=None, title='Название ассистента')
    id_llm: int | None = Field(default=None, title='id llm-модели')
    id_retriever: int | None = Field(default=None, title='id ретривера')

    input_type: str | None = Field(default=None, title='Тип входа')
    prompt: str | None = Field(default=None, title='Промпт модели')
    settings: Dict[str, Any] | None = Field(default=None, title='Настройки')

class Assistant(AssistantBase):
    id: int
    sources: List['Source'] = []
    indexes: List['Index'] = []

    class Config:
        from_attributes = True

class Index(BaseModel):
    id: int = Field(title='id индекса')

    path_to_index: str = Field(title='Сохраненный путь до индекса')

    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class LLMBase(BaseModel):
    name: str = Field(title='Название llm-модели')
    settings: Dict[str, Any] = Field(title='Настройки llm-модели')

class LLMCreate(LLMBase):
    pass

class LLMUpdate(BaseModel):
    name: str | None = Field(default=None, title='Название llm-модели')
    settings: Dict[str, Any] | None = Field(default=None, title='Настройки llm-модели')

class LLM(LLMBase):
    id: int = Field(title='id llm')

    class Config:
        from_attributes = True

class RetrieverModel(BaseModel):

    id: int = Field(title='id ретривера')

    name: str = Field(title='Название ретривера')
    settings: Dict[str, Any] = Field(title='Настройки ретривера')
    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class ChatRequest(BaseModel):
    question: str

class SourceBase(BaseModel):  
    name: str = Field(title='Название источника')
    type: str = Field(title='Тип источника')
    url_or_path: str = Field(title='Ссылка или путь до источника')
    s3_url: str = Field(title='URL в S3')

class SourceCreate(SourceBase):
    pass

class SourceUpdate(BaseModel):
    name: str | None = Field(default=None, title='Название источника')
    type: str | None = Field(default=None, title='Тип источника')
    url_or_path: str | None = Field(default=None, title='Ссылка или путь до источника')
    s3_url: str | None = Field(default=None, title='URL в S3')

class Source(SourceBase):
    id: int = Field(title='id источника')

    class Config:
        from_attributes = True

class Prompt(BaseModel):
    name: Optional[str]
    value: Optional[str]

class Settings(BaseModel):
    temp: int

class FileModel(BaseModel):
    filename: Optional[str]
    content: Optional[str]

class Item(BaseModel):
    file: Optional[FileModel]

class DataFiles(BaseModel):
    txt: Optional[List[Item]] = []
    pdf: Optional[List[Item]] = []
    csv: Optional[List[Item]] = []
    sql: Optional[List[Item]] = []
    mp3: Optional[List[Item]] = []
    xls: Optional[List[Item]] = []
    xlsx: Optional[List[Item]] = []

class Services(BaseModel):
    urls: Optional[List[str]] = []
    confluence: Optional[List[str]] = []
    notion: Optional[List[str]] = []
    figma: Optional[List[str]] = []
    github: Optional[List[str]] = []
    wiki: Optional[List[str]] = []
    trello: Optional[List[str]] = []
    youtube: Optional[List[str]] = []

class RequestData(BaseModel):
    services: Services
    prompt: Optional[Prompt]
    settings: Settings
    activeLlm: Optional[str]
    activeRetriver: Optional[str]
