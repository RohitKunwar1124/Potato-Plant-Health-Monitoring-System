import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import os
from gdown.download import download
from tensorflow.keras.applications.efficientnet import preprocess_input  # type: ignore[reportMissingImports]


# DOWNLOAD MODEL (.keras)
MODEL_PATH = "potato_efficientnet.keras"

if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    download(
        "https://drive.google.com/uc?id=1jLnCZ7mALU8IM27UFkP35wa_K4_KaToF",
        MODEL_PATH,
        quiet=False
    )

# LOAD MODEL
model = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


# READ IMAGE
def read_file_as_image(data):
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((256, 256))
    return np.array(image)


# PREPROCESS (IMPORTANT)
def prepare_image(image):
    image = image.astype("float32")
    image = preprocess_input(image)  
    return np.expand_dims(image, axis=0)

# CONFIDENCE LEVEL
def get_confidence_level(conf):
    if conf > 0.75:
        return "High"
    elif conf > 0.5:
        return "Medium"
    else:
        return "Low"

# PREDICT
def predict(image):

    img_batch = prepare_image(image)

    output = model.predict(img_batch, verbose=0)[0]

    predicted_class = CLASS_NAMES[np.argmax(output)]
    confidence = float(np.max(output))

    confidence_level = get_confidence_level(confidence)

    return predicted_class, confidence, confidence_level