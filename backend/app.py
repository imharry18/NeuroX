from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import torch
import torchvision.models as models
import segmentation_models_pytorch as smp
import torch.nn as nn
import numpy as np
import cv2

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image

app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Static Files (Allows frontend to access saved images via /static/...)
app.mount("/static", StaticFiles(directory="."), name="static")

# --------------------------------
# DEVICE
# --------------------------------
device = torch.device("cpu")

# --------------------------------
# LOAD CLASSIFICATION MODEL
# --------------------------------
classifier = models.efficientnet_b0()
classifier.classifier[1] = nn.Linear(classifier.classifier[1].in_features, 4)

# Load weights (ensure the path is correct)
classifier.load_state_dict(torch.load("neurox_brain_tumor_classifier.pth", map_location=device))
classifier.eval()

classes = ["glioma", "meningioma", "notumor", "pituitary"]
target_layer = classifier.features[-1]

# --------------------------------
# LOAD SEGMENTATION MODEL
# --------------------------------
seg_model = smp.Unet(
    encoder_name="resnet34",
    encoder_weights=None,
    in_channels=1,
    classes=1
)

seg_model.load_state_dict(torch.load("neurox_unet_segmentation.pth", map_location=device))
seg_model.eval()

# --------------------------------
# HELPER FUNCTIONS
# --------------------------------

def preprocess_image(img):
    # Resize and convert BGR to RGB for PyTorch models
    img_resized = cv2.resize(img, (224, 224))
    img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    img_normalized = img_rgb / 255.0
    
    # Convert to tensor: shape (1, 3, 224, 224)
    tensor = torch.tensor(img_normalized).permute(2, 0, 1).unsqueeze(0).float()
    return tensor

def classify_tumor(img_tensor):
    with torch.no_grad():
        outputs = classifier(img_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred = torch.max(probs, 1)
    
    tumor_type = classes[pred.item()]
    return tumor_type, float(confidence.item())

def segment_tumor(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (224, 224))
    gray = gray / 255.0
    
    tensor = torch.tensor(gray).unsqueeze(0).unsqueeze(0).float()
    
    with torch.no_grad():
        pred = seg_model(tensor)
        
    pred = torch.sigmoid(pred)
    mask = pred.squeeze().numpy()
    return mask

def calculate_tumor_size(mask):
    tumor_pixels = np.sum(mask > 0.5)
    tumor_size = tumor_pixels * 0.01  # Arbitrary scaling factor for cm3 estimation
    return float(tumor_size)

def tumor_severity(size):
    if size == 0:
        return "None"
    elif size < 10:
        return "Low"
    elif size < 40:
        return "Medium"
    else:
        return "High"

def generate_gradcam(img_tensor, original_img):
    cam = GradCAM(model=classifier, target_layers=[target_layer])
    grayscale_cam = cam(input_tensor=img_tensor)[0]
    
    # Prepare original image for overlay (must be RGB float 0-1)
    rgb_img = cv2.resize(original_img, (224, 224))
    rgb_img = cv2.cvtColor(rgb_img, cv2.COLOR_BGR2RGB) / 255.0
    
    cam_image = show_cam_on_image(rgb_img, grayscale_cam, use_rgb=True)
    
    # Convert back to BGR for saving with cv2
    cam_image_bgr = cv2.cvtColor(cam_image, cv2.COLOR_RGB2BGR)
    return cam_image_bgr

def generate_segmentation_overlay(original_img, mask):
    # Resize original image to match mask size (224x224)
    orig_resized = cv2.resize(original_img, (224, 224))
    
    # Create a blank image of the same size with all zeros
    red_overlay = np.zeros_like(orig_resized)
    
    # In OpenCV, images are BGR. Red is channel 2.
    # Set the color to pure red (Blue=0, Green=0, Red=255) where the mask detects a tumor
    red_overlay[mask > 0.5] = (0, 0, 255) 
    
    # Overlay the red mask onto the original image
    # You can tweak 0.7 (image opacity) and 0.5 (red mask opacity) to change the look
    overlay = cv2.addWeighted(orig_resized, 0.7, red_overlay, 0.5, 0)
    
    return overlay

# --------------------------------
# ROUTES
# --------------------------------

@app.get("/")
def home():
    return {"message": "NeuroX API Running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # 1. Read Image
    image_bytes = await file.read()
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 2. Classification
    img_tensor = preprocess_image(img)
    tumor_type, confidence = classify_tumor(img_tensor)
    tumor_detected = bool(tumor_type != "notumor")

    # 3. Segmentation & Sizing
    mask = segment_tumor(img)
    
    # Force size and severity to 0/None if classifier says no tumor
    if tumor_detected:
        tumor_size = calculate_tumor_size(mask)
        severity = tumor_severity(tumor_size)
    else:
        tumor_size = 0.0
        severity = "None"
        mask = np.zeros_like(mask) # Clear mask for visual if no tumor

    # 4. Generate Visuals
    gradcam_img = generate_gradcam(img_tensor, img)
    segmentation_img = generate_segmentation_overlay(img, mask)

    # 5. Save Output Images locally (served via /static/)
    cv2.imwrite("gradcam_output.jpg", gradcam_img)
    cv2.imwrite("segmentation_output.jpg", segmentation_img)

    # 6. Return Exact Required JSON Structure
    return {
        "tumor_detected": tumor_detected,
        "tumor_type": tumor_type,
        "confidence": confidence,
        "tumor_size": tumor_size,
        "severity": severity,
        "segmentation_image": "/static/segmentation_output.jpg",
        "gradcam_image": "/static/gradcam_output.jpg"
    }