import re
from typing import List, Dict, Tuple
import pdfplumber

COMMON_SECTIONS = [
    "summary",
    "professional summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "achievements",
    "languages",
]

ROLE_KEYWORDS = {
    "software engineer": ["python", "javascript", "react", "node", "django", "api", "aws"],
    "frontend developer": ["react", "typescript", "css", "html", "tailwind", "next"],
    "full stack developer": ["node", "react", "python", "django", "graphql", "docker"],
    "ai engineer": ["machine learning", "tensorflow", "pytorch", "nlp", "data", "python"],
}

GRAMMAR_CHECKS = [
    (r"\b(adviced|recieve|teh|adress|occured|seperate)\b", "Review spelling and correct common typos."),
    (r"\b(there|their|they're)\b", "Check correct usage of there/their/they're."),
    (r"\b(it's|its)\b", "Verify correct usage of it's vs its."),
]


def extract_resume_text(file_stream) -> str:
    text = ""
    with pdfplumber.open(file_stream) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text.strip()


def find_sections(text: str) -> Dict[str, bool]:
    text_lower = text.lower()
    sections = {}
    for section in COMMON_SECTIONS:
        sections[section] = section in text_lower
    return sections


def find_keywords(text: str, keywords: List[str]) -> Dict[str, int]:
    text_lower = text.lower()
    counts = {}
    for keyword in keywords:
        pattern = re.escape(keyword.lower())
        counts[keyword] = len(re.findall(pattern, text_lower))
    return counts


def grammar_issues(text: str) -> List[str]:
    issues = []
    for pattern, message in GRAMMAR_CHECKS:
        if re.search(pattern, text, re.IGNORECASE):
            issues.append(message)
    return list(dict.fromkeys(issues))


def generate_suggestions(text: str, role: str, skills: List[str], sections: Dict[str, bool], missing_skills: List[str], grammar: List[str]) -> List[str]:
    suggestions = []
    if grammar:
        suggestions.extend(grammar)
    if missing_skills:
        suggestions.append(f"Add or highlight these skills: {', '.join(missing_skills)}.")
    if not sections.get("summary"):
        suggestions.append("Add a strong summary or profile section at the top.")
    if not sections.get("experience"):
        suggestions.append("Expand the experience section with quantified achievements.")
    if not sections.get("education"):
        suggestions.append("Include your education section with dates and institutions.")
    if not sections.get("skills"):
        suggestions.append("List technical and soft skills in a dedicated skills section.")
    if role and skills:
        suggestions.append(f"Tailor your resume to {role} by adding more relevant role-specific keywords.")
    return suggestions[:6]


def analyze_resume_text(text: str, role: str = None, skills: List[str] = None) -> Tuple[int, List[str], List[str], List[str], List[str], Dict[str, int], str]:
    if skills is None:
        skills = []
    text_lower = text.lower()
    sections = find_sections(text)
    role_keywords = ROLE_KEYWORDS.get(role.lower(), []) if role else []
    target_keywords = set([k.lower() for k in (skills or [])] + role_keywords)
    keyword_counts = find_keywords(text, list(target_keywords)) if target_keywords else {}
    missing_skills = [kw for kw in target_keywords if keyword_counts.get(kw, 0) == 0]
    grammar = grammar_issues(text)
    strengths = [section.title() for section, present in sections.items() if present][:4]
    weak_sections = [section.title() for section, present in sections.items() if not present and section in ["summary", "experience", "education", "skills", "projects"]]
    score = 70
    score += sum(5 for present in sections.values() if present)
    score += min(10, len(text) // 600)
    score += max(0, 10 - len(missing_skills))
    score -= min(15, len(grammar) * 5)
    score = max(40, min(100, score))
    summary = f"Resume contains {len(text.split())} words and {len(sections)} core section checks." if text else "No resume text extracted."
    return score, missing_skills, generate_suggestions(text, role or "", skills, sections, missing_skills, grammar), weak_sections, strengths, keyword_counts, summary
