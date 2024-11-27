
from sqlalchemy.orm import Session
from models import Source
from schemas import SourceCreate, SourceUpdate

def get_sources(db: Session):
    return db.query(Source).all()

def get_source(db: Session, id_source: int):
    return db.query(Source).where(Source.id == id_source).first()

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

def update_source(db: Session, id_source: int, source_update: SourceUpdate):
    db_source = get_source(db, id_source)
    if not db_source:
        return None
    update_data = source_update.model_dump(exclude_unset=True)
    db.query(Source).filter(Source.id == id_source).update(update_data)
    db.commit()
    db.refresh(db_source)
    return db_source

def delete_source(db: Session, id_source: int): 
    db_source = get_source(db, id_source) 
    if not db_source: 
        return None 
    db.delete(db_source) 
    db.commit() 
    return db_source