# Backend

FastAPI backend for CareerPilot AI.

Run locally:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Deployment

This backend can be deployed to Render as a Python web service.

- Root: `backend/`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Required environment variables:
  - `MONGODB_URI`
  - `SECRET_KEY`
  - `GEMINI_API_KEY`
  - `FIREBASE_STORAGE_BUCKET`
  - `FIREBASE_CREDENTIALS_PATH` or `FIREBASE_CREDENTIALS_JSON`
  - `GOOGLE_OAUTH_CLIENT_ID`
  - `GOOGLE_OAUTH_CLIENT_SECRET`
