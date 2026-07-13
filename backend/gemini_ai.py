from groq import Groq
import json

# =====================================================
# GROQ CLIENT
# =====================================================
import os
from dotenv import load_dotenv

load_dotenv()
 
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =====================================================
# CLEAN JSON PARSER
# =====================================================

def clean_json(text):

    text = text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    first = text.find("{")
    last = text.rfind("}")

    if first != -1 and last != -1:
        text = text[first:last + 1]

    return text


# =====================================================
# EVALUATE SINGLE ANSWER
# =====================================================

def evaluate_answer(question, answer):

    prompt = f"""
You are a Senior HR Interviewer.

Interview Question:
{question}

Candidate Answer:
{answer}

Evaluate the candidate professionally.

Return ONLY valid JSON.

DO NOT explain.
DO NOT write markdown.
DO NOT use ```json.

JSON format:

{{
    "overall_score":85,
    "communication":8,
    "confidence":8,
    "grammar":8,
    "technical":8,

    "strengths":[
        "Strength 1",
        "Strength 2",
        "Strength 3"
    ],

    "improvements":[
        "Improvement 1",
        "Improvement 2",
        "Improvement 3"
    ],

    "feedback":"Write detailed professional interview feedback in 5-6 lines."
}}
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an HR interviewer. "
                        "Always return ONLY valid JSON."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.2

        )

        text = response.choices[0].message.content

        print("\n================ RAW GROQ RESPONSE ================\n")
        print(text)
        print("\n===================================================\n")

        text = clean_json(text)

        result = json.loads(text)

        return result

    except Exception as e:

        print("Groq Error:", e)

        return {

            "overall_score": 0,

            "communication": 0,

            "confidence": 0,

            "grammar": 0,

            "technical": 0,

            "strengths": [

                "Unable to evaluate answer."

            ],

            "improvements": [

                "Please try again."

            ],

            "feedback": str(e)

        }
    # =====================================================
# FINAL INTERVIEW REPORT
# =====================================================

def final_interview_report(interview_data):

    prompt = f"""
You are a Senior HR Interviewer.

Below is the complete interview.

{interview_data}

Analyze the candidate's overall performance.

Return ONLY valid JSON.

DO NOT explain.
DO NOT use markdown.
DO NOT use ```json.

Return this exact JSON format:

{{
    "overall_score":88,

    "communication":9,

    "confidence":8,

    "grammar":9,

    "technical":8,

    "strengths":[
        "Strong communication skills",
        "Good confidence while answering",
        "Relevant technical knowledge"
    ],

    "improvements":[
        "Provide more real-world examples",
        "Improve answer structure",
        "Expand technical explanations"
    ],

    "summary":"Write a professional interview summary in 6-8 lines describing the candidate's overall interview performance.",

    "recommendation":"Hire"
}}

Recommendation must be exactly one of:

Hire
Strong Hire
Average
Need Improvement
Reject
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content":
                    "You are an HR interviewer. Return ONLY valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.2

        )

        text = response.choices[0].message.content

        print("\n========== FINAL REPORT RAW ==========\n")
        print(text)
        print("\n======================================\n")

        text = clean_json(text)

        report = json.loads(text)

        return report

    except Exception as e:

        print("Final Report Error:", e)

        return {

            "overall_score":0,

            "communication":0,

            "confidence":0,

            "grammar":0,

            "technical":0,

            "strengths":[
                "Unable to generate report"
            ],

            "improvements":[
                "Please retry the interview"
            ],

            "summary":str(e),

            "recommendation":"Retry"

        }
    # =====================================================
# AI CAREER ASSISTANT
# =====================================================

def career_assistant(question):

    prompt = f"""
You are an Expert AI Career Coach.

You help students and professionals with:

• Resume Improvement
• ATS Resume Optimization
• Interview Preparation
• HR Interview Questions
• Technical Interview Questions
• Career Roadmaps
• AI & Machine Learning
• Web Development
• Data Science
• Software Development
• Programming
• Higher Studies
• Job Search
• Freelancing
• Salary Guidance
• Soft Skills
• Startup Advice

Your answers must be:

- Professional
- Practical
- Clear
- Detailed
- Easy to understand
- Motivational

User Question:

{question}
"""

    try:

        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "system",
                    "content":
                    "You are an expert AI Career Coach."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.4

        )

        return response.choices[0].message.content.strip()

    except Exception as e:

        print("Career Assistant Error:", e)

        return (
            "Sorry, I couldn't process your request right now. "
            "Please try again later."
        )