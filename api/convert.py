import tensorflow as tf

# Load your existing model
# model = tf.keras.models.load_model("potato_efficientnet.keras.keras")
model = tf.keras.models.load_model("potato_resnet50.keras")

# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save
with open("resmodel.tflite", "wb") as f:
    f.write(tflite_model)

print("Converted to TFLite")