from app.services.gemini import call_gemini


def generate_cover_letter(company_name: str, role: str, resume_text: str = '') -> str:
    prompt = (
        f"Write a professional cover letter for a job application to {company_name} for the role of {role}. "
        f"Use the following resume summary for context: {resume_text[:400]}" if resume_text else ""
    )
    result = call_gemini(prompt)
    if not result:
        return "Unable to generate cover letter at this time."
    return result.get('choices', [{}])[0].get('message', {}).get('content', '').strip()
