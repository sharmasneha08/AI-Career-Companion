from groq import Groq
import random
import traceback
import os
from dotenv import load_dotenv
# ===========================
# GROQ CLIENT
# ===========================

from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

# ===========================
# GENERATE QUESTIONS
# ===========================

def generate_questions(role):

    role_lower = role.lower()

    # ===========================
    # SELECT INTERVIEWER
    # ===========================

    if "ias" in role_lower or "civil" in role_lower or "upsc" in role_lower:

        interviewer = random.choice([
            "Senior UPSC Interview Board Member",
            "Former IAS Officer",
            "UPSC Personality Test Panel"
        ])

    elif "software" in role_lower or "developer" in role_lower or "programmer" in role_lower:

        interviewer = random.choice([
            "Google Senior Software Engineer",
            "Microsoft Technical Lead",
            "Amazon Hiring Manager",
            "Principal Software Architect"
        ])

    elif "data" in role_lower or "analyst" in role_lower:

        interviewer = random.choice([
            "Senior Data Scientist",
            "Business Intelligence Manager",
            "Google Analytics Manager"
        ])

    elif "machine learning" in role_lower or "ml" in role_lower or "ai" in role_lower:

        interviewer = random.choice([
            "Senior AI Engineer",
            "Machine Learning Lead",
            "AI Research Scientist"
        ])

    elif "doctor" in role_lower:

        interviewer = random.choice([
            "Chief Medical Officer",
            "Hospital Director",
            "Senior Surgeon"
        ])

    elif "teacher" in role_lower or "professor" in role_lower:

        interviewer = random.choice([
            "Senior School Principal",
            "Education Board Member",
            "University Professor"
        ])

    elif "bank" in role_lower:

        interviewer = random.choice([
            "Senior SBI Manager",
            "Bank Recruitment Officer",
            "Finance HR Manager"
        ])

    elif "police" in role_lower:

        interviewer = random.choice([
            "Senior IPS Officer",
            "Police Recruitment Board",
            "Home Ministry Panel"
        ])

    else:

        interviewer = random.choice([
            "Experienced Hiring Manager",
            "Senior HR Manager",
            "Industry Expert"
        ])

    # ===========================
    # RANDOM DIFFICULTY
    # ===========================

    difficulty = random.choice([
        "Easy",
        "Medium",
        "Hard",
        "Mixed"
    ])

    # ===========================
    # RANDOM INTERVIEW STYLE
    # ===========================

    styles = [
        "Friendly",
        "Professional",
        "Stress Interview",
        "Technical",
        "Behavioral"
    ]

    style = random.choice(styles)

    # ===========================
    # PROMPT
    # ===========================

    prompt = f"""
You are acting as a {interviewer}.

Interview Style:
{style}

Interview Difficulty:
{difficulty}

Candidate Role:
{role}

Generate EXACTLY 5 interview questions.

The questions MUST be related ONLY to the role "{role}".

Rules:

• Make every interview different.
• Don't repeat common questions.
• 1 HR question.
• 2 Role-specific technical questions.
• 1 Project/Experience question.
• 1 Scenario-based question.

Return ONLY:

1. Question
2. Question
3. Question
4. Question
5. Question
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=1.4,
            top_p=0.95,
            max_tokens=700
        )

        text = response.choices[0].message.content

        print("\n========== RAW RESPONSE ==========\n")
        print(text)
        print("\n==================================\n")

        questions = []

        for line in text.split("\n"):

            line = line.strip()

            if (
                len(line) > 2
                and line[0].isdigit()
                and "." in line
            ):
                question = line.split(".", 1)[1].strip()

                if question:
                    questions.append(question)

        # Remove duplicate questions
        questions = list(dict.fromkeys(questions))

        print("Generated Questions Count:", len(questions))
        print(questions)

        if len(questions) >= 5:
            return questions[:5]

        # Fill if fewer than 5 questions
        while len(questions) < 5:
            questions.append(
                f"Explain your experience related to {role}."
            )

        return questions

    except Exception:

        traceback.print_exc()

        return [

            f"Tell me about yourself as a {role}.",

            f"What inspired you to become a {role}?",

            f"What are the biggest challenges in the {role} profession?",

            f"Describe your strongest experience related to {role}.",

            f"Why should we hire you as a {role}?"

        ]