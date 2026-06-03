# CareerPilotAI

[![CI](https://github.com/Simar-dev502/CareerPilotAI/actions/workflows/ci.yml/badge.svg)](https://github.com/Simar-dev502/CareerPilotAI/actions/workflows/ci.yml)

AI-powered career development platform that helps students and job seekers improve their resumes, prepare for interviews, identify skill gaps, generate cover letters, receive job recommendations, and build personalized learning roadmaps.

## Project Overview

CareerPilot AI is a full-stack SaaS career assistant built with:
- `frontend/` React + TypeScript + Vite + Tailwind
- `backend/` FastAPI + Motor (MongoDB)

### Features
- Resume analysis and ATS-friendly insights
- Interview prep and question generation
- Cover letter generation
- Job recommendations
- Personalized learning roadmap generation
- Analytics dashboard with charts and activity history

### Environment files
- `./backend/.env.example`
- `./frontend/.env.example`

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Continuous Integration

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml`.
The workflow runs on `push` and `pull_request` for the `main` branch and performs:
- backend dependency install and Python source compilation
- frontend dependency install and Vite production build

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

### Frontend on Vercel
- Deploy the `frontend/` folder as a Vercel project.
- Build command: `npm run build`
- Output directory: `dist`
- Set an environment variable in Vercel:
  - `VITE_API_URL` = `https://<your-backend-url>`

### Backend on Render
- Deploy the `backend/` folder as a Render Python web service.
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Set the following environment variables in Render:
  - `MONGODB_URI`
  - `SECRET_KEY`
  - `GEMINI_API_KEY`
  - `FIREBASE_STORAGE_BUCKET`
  - `FIREBASE_CREDENTIALS_PATH` or `FIREBASE_CREDENTIALS_JSON`
  - `GOOGLE_OAUTH_CLIENT_ID`
  - `GOOGLE_OAUTH_CLIENT_SECRET`

### MongoDB Atlas
- Create a MongoDB Atlas cluster.
- Add a database user and whitelist your app IP ranges or use access from anywhere.
- Use the Atlas connection string as `MONGODB_URI`.
- Example:
  `mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`

### Notes
- The backend supports Firebase credentials from a file path or a JSON string.
- In Render, using `FIREBASE_CREDENTIALS_JSON` is the easiest option for service account credentials.

