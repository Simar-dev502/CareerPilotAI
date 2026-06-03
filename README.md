# CareerPilot AI

Starter scaffold for CareerPilot AI — full-stack SaaS career assistant.

Folders:
- `frontend/` React + TypeScript + Vite + Tailwind
- `backend/` FastAPI + Motor (MongoDB)

Features:
- Analytics dashboard with charts and activity history

Environment files:
- `./backend/.env.example`
- `./frontend/.env.example`

Quick start (backend):

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Quick start (frontend):

```bash
cd frontend
npm install
npm run dev
```

Deployment:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Deployment Configuration

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
