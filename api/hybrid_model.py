import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO
import os
from gdown.download import download

from tensorflow.keras.applications.efficientnet import preprocess_input  # pyright: ignore[reportMissingImports]

# DOWNLOAD MODELS IF NOT EXISTS
# ==============================

if not os.path.exists("potato_resnet50.keras"):
    print("Downloading ResNet model...")
    download(
        "https://drive.google.com/uc?id=17K8h1rgRWKWKa4GjSijPicJLx_Js1ye0",
        quiet=False
    )

if not os.path.exists("potato_efficientnet.keras"):
    print("Downloading EfficientNet model...")
    download(
        "https://drive.google.com/uc?id=1jLnCZ7mALU8IM27UFkP35wa_K4_KaToF",
        "potato_efficientnet.keras",
        quiet=False
    )

    
# LOAD MODELS
resnet_model = tf.keras.models.load_model("potato_resnet50.keras") 
efficient_model = tf.keras.models.load_model("potato_efficientnet.keras") 

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]


# READ IMAGE
def read_file_as_image(data):

    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((256,256))

    image = np.array(image)

    return image


# PREPROCESS
def prepare_image(image):

    image = image.astype("float32")

    image = preprocess_input(image)

    img_batch = np.expand_dims(image, axis=0)

    return img_batch


# HYBRID PREDICTION
def hybrid_predict(image):

    img_batch = prepare_image(image)

    # Predict from both models
    resnet_pred = resnet_model.predict(img_batch, verbose=0)
    efficient_pred = efficient_model.predict(img_batch, verbose=0)

    # Soft Voting (Average)
    final_pred = (0.4 * resnet_pred) + (0.6 * efficient_pred)

    predicted_class = CLASS_NAMES[np.argmax(final_pred[0])]
    confidence = float(np.max(final_pred[0]))

    return predicted_class, confidence
