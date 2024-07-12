from fastapi import FastAPI, Request
from . import crud, auth
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from mangum import Mangum



app = FastAPI()
handler = Mangum(app)

templates = Jinja2Templates(directory="app/templates")


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html")


app.include_router(auth.router)
app.include_router(crud.router)
