import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import os
from gdown.download import download


# DOWNLOAD MODEL
MODEL_PATH = "model.tflite"

if not os.path.exists(MODEL_PATH):
    print("Downloading TFLite model...")
    download(
        "https://drive.google.com/uc?id=1AwXw0DyT01x6beXpkTgpnqdmBLLu8LBp",
        MODEL_PATH,
        quiet=False
    )


# LOAD TFLITE MODEL

interpreter = tf.lite.Interpreter(model_path=MODEL_PATH)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


# READ IMAGE

def read_file_as_image(data):
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((256, 256))
    image = np.array(image)
    return image


# PREPROCESS

def prepare_image(image):
    image = image.astype("float32") / 255.0
    img_batch = np.expand_dims(image, axis=0)
    return img_batch


# PREDICT

def predict(image):

    img_batch = prepare_image(image)

    # Set input tensor
    interpreter.set_tensor(input_details[0]['index'], img_batch)

    # Run inference
    interpreter.invoke()

    # Get output
    output = interpreter.get_tensor(output_details[0]['index'])

    predicted_class = CLASS_NAMES[np.argmax(output[0])]
    confidence = float(np.max(output[0]))

    return predicted_class, confidence