
from datetime import datetime
from tokenize import String

from ..database import Base
from sqlalchemy import JSON, DateTime, ForeignKey, func, create_engine, Column, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional, Dict, Any

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    nickname: Mapped[str]
    avatar: Mapped[str]
    email: Mapped[str]
    hashed_password: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    assistants: Mapped[List['Assistant']] = relationship('Assistant', back_populates='user')

class Assistant(Base):
    __tablename__='assistants'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    name: Mapped[str]

    #ForeignKeys 
    id_llm: Mapped[int] = mapped_column(ForeignKey('llm.id')) 
    id_retriever: Mapped[int] = mapped_column(ForeignKey('retriever_models.id'))
    id_user: Mapped[int] = mapped_column(ForeignKey('users.id'))

    input_type: Mapped[str]
    prompt: Mapped[str]
    settings: Mapped[Dict[str, Any]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    #Relationships
    llm: Mapped['LLM'] = relationship(back_populates='assistants')
    retriever: Mapped['RetrieverModel'] = relationship(back_populates='assistants')
    sources: Mapped[List['Source']] = relationship(back_populates='assistant')
    indexes: Mapped[List['Index']] = relationship(back_populates='assistant')
    user: Mapped['User'] = relationship('User', back_populates='assistants')

class Source(Base):
    __tablename__='sources'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    id_assistant: Mapped[Optional[int]] = mapped_column(ForeignKey('assistants.id'))

    name: Mapped[str]
    type: Mapped[str]
    url_or_path: Mapped[str]
    s3_url: Mapped[str]
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    assistant: Mapped[Optional['Assistant']] = relationship(back_populates='sources') 

class Index(Base):
    __tablename__='indexes'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    id_assistant: Mapped[Optional[int]] = mapped_column(ForeignKey('assistants.id'))

    path_to_index: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    assistant: Mapped[Optional['Assistant']] = relationship(back_populates='indexes')

class LLM(Base):
    __tablename__='llm'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)

    name: Mapped[str]
    settings: Mapped[Dict[str, Any]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    #Relationships
    assistants: Mapped[List['Assistant']] = relationship(back_populates='llm')

class RetrieverModel(Base):
    __tablename__='retriever_models'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)

    name: Mapped[str]
    settings: Mapped[Dict[str, Any]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    #Relationships
    assistants: Mapped[List['Assistant']] = relationship(back_populates='retriever')


class Bot(Base):
    __tablename__ = 'bot'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True, unique=True)

    files: Mapped[Dict[str, Any]] = mapped_column(JSON)
    services: Mapped[Dict[str, Any]] = mapped_column(JSON)
    prompt_name: Mapped[str]
    prompt_value: Mapped[str]
    settings_temp: Mapped[int]
    active_llm: Mapped[str]
    active_retriver: Mapped[str]
    index_storage: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())


