import requests


def analyze_github_username(username: str) -> dict:
    user_url = f"https://api.github.com/users/{username}"
    repos_url = f"https://api.github.com/users/{username}/repos?per_page=100"
    user_resp = requests.get(user_url)
    repos_resp = requests.get(repos_url)
    if user_resp.status_code != 200 or repos_resp.status_code != 200:
        return {}

    repos = repos_resp.json()
    total_stars = sum(repo.get('stargazers_count', 0) for repo in repos)
    languages = [repo.get('language') for repo in repos if repo.get('language')]
    top_languages = sorted(set(languages), key=lambda lang: languages.count(lang), reverse=True)[:4]
    repo_summaries = [
        {
            'name': repo.get('name', ''),
            'language': repo.get('language', 'Unknown'),
            'stars': repo.get('stargazers_count', 0),
            'url': repo.get('html_url', ''),
        }
        for repo in repos[:6]
    ]
    score = min(100, 50 + len(repos) * 3 + total_stars)
    suggestions = []
    if len(repos) < 3:
        suggestions.append('Add more repositories to showcase active development.')
    if total_stars < 10:
        suggestions.append('Create or promote repo projects to increase stars and visibility.')
    if 'JavaScript' not in top_languages and 'Python' not in top_languages:
        suggestions.append('Showcase a primary language with complete sample projects.')

    return {
        'username': username,
        'developer_score': score,
        'top_languages': top_languages,
        'total_repos': len(repos),
        'total_stars': total_stars,
        'suggestions': suggestions,
        'repos': repo_summaries,
    }
