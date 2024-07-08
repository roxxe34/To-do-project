from fastapi import FastAPI
from app import models, crud, auth

from tortoise.contrib.fastapi import register_tortoise
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = FastAPI()

register_tortoise(
    app,
    db_url=os.getenv('DYNAMODB_ENDPOINT_URL'),
    modules={'models': ['app.models']},
    generate_schemas=True,
    add_exception_handlers=True,
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(auth.router)
app.include_router(crud.router)
