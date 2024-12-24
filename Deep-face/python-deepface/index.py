from deepface import DeepFace
import json
from flask import Flask, request, jsonify

# DeepFace.stream(db_path = "./facial_db")

# Use Face Recognition and Attribute Analysis in Real-time Videos
# DeepFace.stream(db_path = "C:/facial_db")

################################

app = Flask(__name__)

@app.route("/verification", methods=["GET"])
def get_verification():
    verification = DeepFace.verify(img1_path = "lula-1.jpg", img2_path = "lula-2.jpg")

    return jsonify(verification)

@app.route("/analysis", methods=["GET"])
def get_analysis():
    analysis = DeepFace.analyze(img_path = "./lula-1.jpg", actions = ["age", "gender", "emotion", "race"])

    return jsonify(analysis)

@app.route("/model", methods=["GET"])
def get_model():
    models = ["VGG-Face", "Facenet", "OpenFace", "DeepFace", "DeepID", "Dlib", "ArcFace"]

    verification = DeepFace.verify(img1_path = "lula-1.jpg", img2_path = "lula-2.jpg", model_name = models[3])

    return jsonify(verification)

@app.route("/detector", methods=["GET"])
def get_detector():
    detectors = ["opencv", "ssd", "mtcnn", "dlib", "retinaface"]

    verification = DeepFace.detectFace("./lula-1.jpg", detector_backend = detectors[4])
    
    return verification

@app.route("/detectors", methods=["GET"])
def get_detectors():
    detectors = ["opencv", "ssd", "mtcnn", "dlib", "retinaface"]

    verification = DeepFace.verify("./lula-1.jpg", "./lula-2.jpg", detector_backend = detectors[0])

    return jsonify(verification)

if __name__ == "__main__":
    app.run(debug=True)
