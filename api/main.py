from fastapi import FastAPI, File, UploadFile
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from hybrid_model import read_file_as_image, hybrid_predict
import json
import os
app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://potatohealth.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(BASE_DIR, "advice.json"), "r", encoding="utf-8") as f:
    ADVICE_BY_CLASS = json.load(f)



@app.get("/ping")
async def ping():
    return "Hello, I am alive"

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = read_file_as_image(await file.read())

    predicted_class, confidence = hybrid_predict(image)

    advice = ADVICE_BY_CLASS.get(predicted_class, {})

    return {
        "class": predicted_class,
        "confidence": confidence,
        "advice": advice
    }
