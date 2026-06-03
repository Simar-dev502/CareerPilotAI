from typing import List
from app.services.gemini import call_gemini


def generate_interview_questions(role: str, experience_level: str, skills: List[str]) -> List[dict]:
    prompt = (
        f"Generate 3 HR questions, 3 technical questions, 2 behavioral questions, and 2 scenario-based questions "
        f"for a {experience_level} {role} with skills {', '.join(skills)}. Return result as JSON categories and questions."
    )
    result = call_gemini(prompt)
    return result.get('choices', [{}])[0].get('message', {}).get('content', []) if result else []


def evaluate_interview_answer(question: str, answer: str) -> dict:
    prompt = (
        f"Evaluate the following interview answer. Question: {question}. Answer: {answer}. "
        "Return a JSON object with communication_score (1-100), confidence_score (1-100), technical_accuracy (1-100), "
        "and improvement_suggestions as a list."
    )
    result = call_gemini(prompt)
    return result.get('choices', [{}])[0].get('message', {}).get('content', {}) if result else {}
