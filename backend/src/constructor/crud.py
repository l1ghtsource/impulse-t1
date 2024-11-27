
from sqlalchemy.orm import Session
from .models import LLM, Source, Assistant
from .schemas import AssistantCreate, AssistantUpdate, LLMCreate, LLMUpdate, SourceCreate, SourceUpdate

class CRUDSource:

    @staticmethod
    def get_sources(db: Session):
        return db.query(Source).all()

    @staticmethod
    def get_source(db: Session, id_source: int):
        return db.query(Source).where(Source.id == id_source).first()

    @staticmethod
    def create_source(db: Session, source: SourceCreate):
        db_source = Source(
            name=source.name,
            type=source.type, 
            url_or_path=source.url_or_path
        )   
        db.add(db_source)
        db.commit()
        db.refresh(db_source)
        return db_source

    @staticmethod
    def update_source(db: Session, id_source: int, source_update: SourceUpdate):
        db_source = CRUDSource.get_source(db, id_source)
        if not db_source:
            return None
        update_data = source_update.model_dump(exclude_unset=True)
        db.query(Source).filter(Source.id == id_source).update(update_data)
        db.commit()
        db.refresh(db_source)
        return db_source

    @staticmethod
    def delete_source(db: Session, id_source: int): 
        db_source = CRUDSource.get_source(db, id_source) 
        if not db_source: 
            return None 
        db.delete(db_source) 
        db.commit() 
        return db_source
    
class CRUDAssistant:

    @staticmethod
    def get_assistants(db: Session):
        return db.query(Assistant).all()
    
    @staticmethod
    def get_assistant(db: Session, id_assistant: int):
        return db.query(Assistant).where(Assistant.id == id_assistant).first()
    
    @staticmethod
    def create_assistant(db: Session, assistant: AssistantCreate):
        db_assistant = Assistant(
            name=assistant.name,
            id_llm=assistant.id_llm,
            id_retriever=assistant.id_retriever,
            input_type=assistant.input_type,
            prompt=assistant.prompt,
            settings=assistant.settings
        )

        db.add(db_assistant)
        db.commit()
        db.refresh(db_assistant)
        return db_assistant
    
    @staticmethod
    def update_assistant(db: Session, id_assistant: int, assistant_update: AssistantUpdate):
        db_assistant = CRUDAssistant.get_assistant(db, id_assistant)
        if not db_assistant:
            return None
        update_data = assistant_update.model_dump(exclude_unset=True)
        db.query(Assistant).filter(Assistant.id == id_assistant).update(update_data)
        db.commit()
        db.refresh(db_assistant)
        return db_assistant
    
    @staticmethod
    def delete_assistant(db: Session, id_assistant: int):
        db_assistant = CRUDAssistant.get_assistant(db, id_assistant)
        if not db_assistant:
            return None
        db.delete(db_assistant)
        db.commit()
        return db_assistant
    
class CRUDLlm:

    @staticmethod
    def get_all_llm(db: Session):
        return db.query(LLM).all()
    
    @staticmethod
    def get_llm_by_id(db: Session, id_llm: int):
        return db.query(LLM).where(LLM.id == id_llm).first()
    
    @staticmethod
    def create_llm(db: Session, llm: LLMCreate):
        db_llm = LLM(
            name=llm.name,
            settings=llm.settings
        )
        db.add(db_llm)
        db.commit()
        db.refresh(db_llm)
        return db_llm
    
    @staticmethod
    def update_llm(db: Session, id_llm: int, llm_update: LLMUpdate):
        db_llm = CRUDLlm.get_llm_by_id(db, id_llm)
        if not db_llm:
            return None
        update_data = llm_update.model_dump(exclude_unset=True)
        db.query(LLM).where(LLM.id == id_llm).update(update_data)
        db.commit()
        db.refresh(db_llm)
        return db_llm
        
    