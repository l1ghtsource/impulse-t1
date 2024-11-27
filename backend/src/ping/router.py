
from fastapi import APIRouter

router = APIRouter()

@router.get('/ping', tags=['Debug'])
def ping():
    return "pong"
