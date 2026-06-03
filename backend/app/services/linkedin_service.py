from app.services.gemini import call_gemini


def analyze_linkedin_profile(profile_url: str) -> dict:
    prompt = (
        f"Analyze the LinkedIn profile at {profile_url}. "
        "Provide headline, summary advice, skill recommendations, activity insights, and profile improvement suggestions in JSON format."
    )
    result = call_gemini(prompt)
    if not result:
        return {}
    return result.get('choices', [{}])[0].get('message', {}).get('content', {})
