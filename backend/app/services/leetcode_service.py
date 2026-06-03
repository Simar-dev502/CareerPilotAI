from app.services.gemini import call_gemini


def fetch_leetcode_stats(username: str) -> dict:
    prompt = (
        f"Provide LeetCode profile stats for username {username} as a JSON object with solved, easy, medium, hard, rating, streak, and topic_progress. "
        "If the user does not exist, return an object with solved=0 and a message field."
    )
    result = call_gemini(prompt)
    if not result:
        return {}
    return result.get('choices', [{}])[0].get('message', {}).get('content', {})
