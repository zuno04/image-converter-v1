from PIL import Image
from fastapi import FastAPI, Request, UploadFile, File
from .library.iconverter import CustomImage
from random import randint
import base64
from io import BytesIO
import time
from pprint import pprint
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .library.helpers import *
from app.routers import twoforms, unsplash, accordion


app = FastAPI()

db = []

origins = [
    "http://localhost:5000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(unsplash.router)
app.include_router(twoforms.router)
app.include_router(accordion.router)


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    data = openfile("home.md")
    return templates.TemplateResponse("page.html", {"request": request, "data": data})


@app.get("/page/{page_name}", response_class=HTMLResponse)
async def show_page(request: Request, page_name: str):
    data = openfile(page_name+".md")
    return templates.TemplateResponse("page.html", {"request": request, "data": data})


@app.post("/api/reduce_image/")
async def upload_file(file: UploadFile = File(...)):
    db.clear()

    # iamge_name, image_ext = os.path.splitext(file.filename)

    contents = await file.read()

    db.append(contents)

    return {"filename": file.filename}


@app.get("/api/images/")
async def read_random_file(request: Request):

    # get a random file from the image db
    random_index = randint(0, len(db) - 1)

    # image_name, image_ext = os.path.splitext(request.query_params["filename"])

    # Convert image
    new_image = CustomImage(db[random_index], request.query_params["filename"])
    # start_time = time.time()
    response_dic = new_image.reduce_image(size=1, new_quality=50)

    return {"image_data": response_dic["img"], "image_name": response_dic["image_filename"]}


