import crud
import auth
from mangum import Mangum
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
# load_dotenv()  # Load environment variables from .env file

app = FastAPI()
handler = Mangum(app)


# register_tortoise(
#     app,
#     db_url=os.getenv('DYNAMODB_ENDPOINT_URL'),
#     modules={'models': ['app.models']},
#     generate_schemas=True,
#     add_exception_handlers=True,
# )

@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(auth.router)
app.include_router(crud.router)
