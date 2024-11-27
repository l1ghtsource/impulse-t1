
from fastapi import APIRouter

router = APIRouter(
    prefix='/config'
)

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

@router.post('')
def save_config():
    pass

@router.patch('/{id_config}')
def change_config(id_config: int):
    pass


@router.delete('/{id_config}')
def delete_config(id_config: int):
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