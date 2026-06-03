import os
import requests
from app.core.config import settings


def call_gemini(text: str) -> dict:
    """Simple Gemini wrapper placeholder. Replace with official client as needed."""
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set")

    url = "https://api.generativeai.googleapis.com/v1beta2/models/gemini:generateText"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {"prompt": text}
    resp = requests.post(url, json=payload, headers=headers)
    return resp.json()
