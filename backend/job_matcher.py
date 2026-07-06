import re


def contains_skill(text, skill):
    """
    Match complete words only.
    Prevents 'c' from matching 'career'.
    """

    pattern = r"\b" + re.escape(skill.lower()) + r"\b"
    return re.search(pattern, text.lower()) is not None


def match_resume_job(resume_text, job_text):

    skills = [

        # Programming Languages
        "python",
        "java",
        "c++",
        "c#",
        "javascript",
        "typescript",

        # (Removed "c" because it creates false matches)

        # Web
        "html",
        "css",
        "react",
        "angular",
        "vue",
        "node.js",
        "express",
        "fastapi",
        "django",
        "flask",

        # Database
        "sql",
        "mysql",
        "postgresql",
        "mongodb",
        "sqlite",
        "oracle",

        # AI
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "nlp",
        "computer vision",
        "data science",
        "data analysis",
        "tensorflow",
        "keras",
        "pytorch",
        "pandas",
        "numpy",
        "scikit-learn",

        # Cloud
        "aws",
        "azure",
        "docker",
        "kubernetes",
        "git",
        "github",
        "linux",

        # Analytics
        "power bi",
        "tableau",
        "excel",

        # Soft Skills
        "communication",
        "leadership",
        "teamwork",
        "problem solving",
        "critical thinking",
        "time management"
    ]

    matched = []
    missing = []

    for skill in skills:

        job_has = contains_skill(job_text, skill)

        if job_has:

            if contains_skill(resume_text, skill):

                matched.append(skill)

            else:

                missing.append(skill)

    total = len(matched) + len(missing)

    if total == 0:

        percentage = 0

    else:

        percentage = round((len(matched) / total) * 100)

    if percentage >= 90:

        recommendation = "Excellent! Your resume is highly suitable for this job."

    elif percentage >= 70:

        recommendation = "Good match. Learn the missing skills to improve further."

    elif percentage >= 40:

        recommendation = "Average match. Improve your resume and learn the missing skills."

    else:

        recommendation = "Low match. Update your resume according to the job description."

    return {

        "match_percentage": percentage,

        "matched_skills": matched,

        "missing_skills": missing,

        "recommendation": recommendation

    }