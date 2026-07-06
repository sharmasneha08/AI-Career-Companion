def analyze_resume(text):

    skills = [

        "python",
        "java",
        "javascript",
        "c++",

        "sql",
        "mysql",
        "mongodb",

        "machine learning",
        "deep learning",
        "artificial intelligence",

        "data analysis",
        "data visualization",

        "power bi",
        "tableau",
        "excel",

        "react",
        "node",
        "node.js",

        "fastapi",
        "flask",

        "docker",
        "aws",

        "git",
        "github",

        "pandas",
        "numpy",

        "tensorflow",
        "pytorch",

        "html",
        "css",

        "rest api"

    ]


    text = text.lower()



    found_skills = []


    for skill in skills:

        if skill in text:

            found_skills.append(skill)



    # realistic resume score

    score = len(found_skills) * 5


    if score > 100:

        score = 100



    missing_skills = []


    for skill in skills:

        if skill not in found_skills:

            missing_skills.append(skill)



    if score >= 80:

        suggestion = (
            "Excellent resume. Keep building advanced projects."
        )


    elif score >= 50:

        suggestion = (
            "Good resume. Add ML projects and certifications."
        )


    else:

        suggestion = (
            "Improve projects section and add more technical skills."
        )



    return {


        "skills_found": found_skills,


        "resume_score": score,


        "missing_skills": missing_skills[:8],


        "suggestion": suggestion

    }