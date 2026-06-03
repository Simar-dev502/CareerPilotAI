from app.services.gemini import call_gemini


def generate_learning_roadmap(career_goal: str) -> dict:
    prompt = (
        f"Generate an 8-week learning roadmap for someone aiming to become a {career_goal}. "
        "Include weekly focus, resources, projects, and milestones in JSON format."
    )
    result = call_gemini(prompt)
    if not result:
        return {}
    return result.get('choices', [{}])[0].get('message', {}).get('content', {})
