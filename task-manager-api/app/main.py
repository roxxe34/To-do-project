from fastapi import FastAPI, Request
from app import crud
from app import auth
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from mangum import Mangum
from fastapi.staticfiles import StaticFiles




app = FastAPI()
handler = Mangum(app)

templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def helloworld():
    return "hello world"


@app.get("/create_task", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("create_task.html", {"request": request})


app.include_router(auth.router)
app.include_router(crud.router)
