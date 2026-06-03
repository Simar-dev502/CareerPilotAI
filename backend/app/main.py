from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, resume, upload, interview, cover_letter, roadmap, jobs, github, linkedin, leetcode, analytics
from app.db.mongodb import init_db
from app.services.firebase_storage import init_firebase

app = FastAPI(title="CareerPilot AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    init_db()
    try:
        init_firebase()
    except Exception:
        pass

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(upload.router, prefix="/api/upload", tags=["upload"])
app.include_router(interview.router, prefix="/api/interview", tags=["interview"])
app.include_router(cover_letter.router, prefix="/api/cover-letter", tags=["cover-letter"])
app.include_router(roadmap.router, prefix="/api/roadmap", tags=["roadmap"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["jobs"])
app.include_router(github.router, prefix="/api/github", tags=["github"])
app.include_router(linkedin.router, prefix="/api/linkedin", tags=["linkedin"])
app.include_router(leetcode.router, prefix="/api/leetcode", tags=["leetcode"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])

@app.get("/api/health")
async def health():
    return {"status": "ok"}
