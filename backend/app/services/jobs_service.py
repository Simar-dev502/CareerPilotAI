from typing import List
from app.services.gemini import call_gemini


def recommend_jobs(resume_text: str, skills: List[str], experience_years: int) -> List[dict]:
    prompt = (
        f"Based on the resume text and skills {', '.join(skills)}, recommend 5 job roles that are a strong fit. "
        f"Include required skills, missing skills, and a match score out of 100. "
        f"Also return each item as JSON with title, company, required_skills, missing_skills, and match_score."
    )
    result = call_gemini(prompt)
    return result.get('choices', [{}])[0].get('message', {}).get('content', []) if result else []
