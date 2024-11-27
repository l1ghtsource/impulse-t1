
from datetime import datetime
from typing import Any, Dict
from pydantic import BaseModel, Field
from sqlalchemy import JSON

class Assistant(BaseModel):
    id: int = Field(title='id конструктора')

    id_llm: int = Field(title='id llm-модели')
    id_retriever: str = Field(title='id ретривера')

    input_type: str = Field(title='Тип входа')
    prompt: str = Field(title='Промпт модели')
    settings: Dict[str, Any] = Field(title='Настройки')

    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class Index(BaseModel):
    id: int = Field(title='id индекса')

    path_to_index: str = Field(title='Сохраненный путь до индекса')

    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class LLM(BaseModel):
    id: int = Field(title='id llm')

    name: str = Field(title='Название llm-модели')
    settings: JSON = Field(title='Настройки llm-модели')
    created_at: datetime = Field(title='Дата создания') 
    updated_at: datetime = Field(title='Дата последнего обновления')

class RetrieverModel(BaseModel):

    id: int = Field(title='id ретривера')

    name: str = Field(title='Название ретривера')
    settings: JSON = Field(title='Настройки ретривера')
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