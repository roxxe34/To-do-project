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


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(auth.router)
app.include_router(crud.router)
