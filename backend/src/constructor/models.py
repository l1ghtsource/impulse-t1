
from datetime import datetime
from ..database import Base
from sqlalchemy import JSON, DateTime, ForeignKey, func, create_engine
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional, Dict, Any

class Assistant(Base):
    __tablename__='assistants'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, unique=True)
    name: Mapped[str]

    #ForeignKeys 
    id_llm: Mapped[int] = mapped_column(ForeignKey('llm.id')) 
    id_retriever: Mapped[int] = mapped_column(ForeignKey('retriever_models.id'))

    input_type: Mapped[str]
    prompt: Mapped[str]
    settings: Mapped[Dict[str, Any]] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

    #Relationships
    llm: Mapped['LLM'] = relationship(back_populates='assistants')
    retriever: Mapped['RetrieverModel'] = relationship(back_populates='assistants')
    sources: Mapped[List['Source']] = relationship(back_populates='assistant')
    sources: Mapped[List['Index']] = relationship(back_populates='assistant')

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

