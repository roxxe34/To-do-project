from fastapi import FastAPI, Request
from . import crud, auth
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from mangum import Mangum



app = FastAPI()
handler = Mangum(app)


# register_tortoise(
#     app,
#     db_url=os.getenv('DYNAMODB_ENDPOINT_URL'),
#     modules={'models': ['app.models']},
#     generate_schemas=True,
#     add_exception_handlers=True,
# )

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse(
        request=request, name="index.html")


app.include_router(auth.router)
app.include_router(crud.router)
