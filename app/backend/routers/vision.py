# src/api/vision.py

from fastapi import APIRouter, UploadFile, File
import pytesseract
import re
import cv2
import numpy as np

from src.model.inference import predict
from src.data_preprocessing.preprocessing_pipeline import preprocess_text

router = APIRouter()

# 🔒 Windows Tesseract path (REQUIRED on Windows)
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

# -----------------------------
# Helper: split chat messages
# -----------------------------
def split_messages(text: str):
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    # Remove very short noise lines
    return [line for line in lines if len(line) > 3]


# -----------------------------
# Helper: aggregate emotions
# -----------------------------
def get_dominant_emotion(emotions):
    emotion_scores = {}

    for emo in emotions:
        if emo and "top_k" in emo:
            for label, score in emo["top_k"]:
                emotion_scores.setdefault(label, []).append(score)

    if not emotion_scores:
        return None

    avg_scores = {
        label: sum(scores) / len(scores)
        for label, scores in emotion_scores.items()
    }

    sorted_emotions = sorted(
        avg_scores.items(), key=lambda x: x[1], reverse=True
    )

    return {
        "top_k": sorted_emotions[:5],
        "probs": [score for _, score in sorted_emotions[:5]],
    }


# -----------------------------
# MAIN ENDPOINT
# -----------------------------
@router.post("/analyze")
async def analyze_screenshot(file: UploadFile = File(...)):
    try:
        # 1️⃣ Read image bytes
        image_bytes = await file.read()

        # 2️⃣ Decode image
        img = cv2.imdecode(
            np.frombuffer(image_bytes, np.uint8),
            cv2.IMREAD_COLOR,
        )

        if img is None:
            return {"success": False, "error": "Invalid image file"}

        # 3️⃣ Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # 4️⃣ Chat-friendly preprocessing (IMPORTANT)
        gray = cv2.GaussianBlur(gray, (5, 5), 0)
        processed = cv2.equalizeHist(gray)

        # 5️⃣ OCR configuration (CRITICAL)
        custom_config = r"--oem 3 --psm 6"
        extracted_text = pytesseract.image_to_string(
            processed,
            lang="eng",
            config=custom_config,
        )

        if not extracted_text.strip():
            return {"success": False, "error": "No readable text found"}

        # -----------------------------
        # 6️⃣ CLEAN OCR OUTPUT
        # -----------------------------
        cleaned = extracted_text

        # Remove timestamps (11:43 pm, 2:44 pm, etc.)
        cleaned = re.sub(
            r"\b\d{1,2}[:.]\d{2}\s*(am|pm)?\b",
            "",
            cleaned,
            flags=re.IGNORECASE,
        )

        # Remove WhatsApp checkmarks / artifacts
        cleaned = re.sub(r"[✓✔√]{1,}", "", cleaned)

        # Remove bracket garbage
        cleaned = re.sub(r"\[[^\]]*\]", "", cleaned)

        # Remove known OCR hallucinations
        cleaned = re.sub(
            r"\b(qeame|acme|cee|ertco|aryrore|bi)\b",
            "",
            cleaned,
            flags=re.IGNORECASE,
        )

        # Normalize spacing
        cleaned = re.sub(r"\n\s*\n+", "\n", cleaned)
        cleaned = cleaned.strip()

        # -----------------------------
        # 7️⃣ SPLIT INTO MESSAGES
        # -----------------------------
        messages = split_messages(cleaned)

        if not messages:
            return {
                "success": False,
                "error": "No valid chat messages found",
            }

        # -----------------------------
        # 8️⃣ ANALYZE EACH MESSAGE
        # -----------------------------
        messages_with_emotions = []
        all_emotions = []

        for msg in messages:
            processed_msg = preprocess_text(msg)

            if len(processed_msg) < 3:
                continue

            emotion = predict(processed_msg)

            messages_with_emotions.append(
                {"text": msg, "emotion": emotion}
            )
            all_emotions.append(emotion)

        # -----------------------------
        # 9️⃣ AGGREGATE OVERALL EMOTION
        # -----------------------------
        dominant_emotion = get_dominant_emotion(all_emotions)

        return {
            "success": True,
            "extracted_text": cleaned,
            "messages": messages_with_emotions,
            "message_count": len(messages_with_emotions),
            "emotion": dominant_emotion,
        }

    except Exception as e:
        import traceback

        return {
            "success": False,
            "error": str(e),
            "traceback": traceback.format_exc(),
        }
