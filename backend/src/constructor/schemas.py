
from datetime import datetime
from typing import Any, Dict
from pydantic import BaseModel, Field

class AssistantBase(BaseModel):
    name: str = Field(title='Название ассистента')
    id_llm: int = Field(title='id llm-модели')
    id_retriever: str = Field(title='id ретривера')

    input_type: str = Field(title='Тип входа')
    prompt: str = Field(title='Промпт модели')
    settings: Dict[str, Any] = Field(title='Настройки') 

class AssistantCreate(AssistantBase):
    pass

class AssistantUpdate(BaseModel):
    name: str | None = Field(default=None, title='Название ассистента')
    id_llm: int | None = Field(default=None, title='id llm-модели')
    id_retriever: str | None = Field(default=None, title='id ретривера')

    input_type: str | None = Field(default=None, title='Тип входа')
    prompt: str | None = Field(default=None, title='Промпт модели')
    settings: Dict[str, Any] | None = Field(default=None, title='Настройки')

class Assistant(AssistantBase):
    id: int

    class Config:
        from_attributes = True

class Index(BaseModel):
    id: int = Field(title='id индекса')

    path_to_index: str = Field(title='Сохраненный путь до индекса')

    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class LLM(BaseModel):
    id: int = Field(title='id llm')

    name: str = Field(title='Название llm-модели')
    settings: Dict[str, Any] = Field(title='Настройки llm-модели')
    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class RetrieverModel(BaseModel):

    id: int = Field(title='id ретривера')

    name: str = Field(title='Название ретривера')
    settings: Dict[str, Any] = Field(title='Настройки ретривера')
    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class ChatRequest(BaseModel):
    question: str

class Source(BaseModel):
    id: int = Field(title='id источника')
    
    name: str = Field(title='Название источника')
    type: str = Field(title='Тип источника')
    url_or_path: str = Field(title='Ссылка или путь до источника')
    
    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class SourceCreate(BaseModel):
    name: str = Field(title='Название источника')
    type: str = Field(title='Тип источника')
    url_or_path: str = Field(title='Ссылка или путь до источника')

class SourceUpdate(BaseModel):
    name: str | None = Field(default=None, title='Название источника')
    type: str | None = Field(default=None, title='Тип источника')
    url_or_path: str | None = Field(default=None, title='Ссылка или путь до источника')