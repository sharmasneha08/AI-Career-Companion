from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException,
)

from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from pymongo import MongoClient

from passlib.context import CryptContext

import fitz
import os

# ===========================
# LOCAL MODULES
# ===========================

from analyzer import analyze_resume

from job_matcher import match_resume_job

from interview_coach import generate_questions

from gemini_ai import (
    evaluate_answer,
    final_interview_report,
    career_assistant,
)

# ===========================
# FASTAPI
# ===========================

app = FastAPI(
    title="AI Career Companion API",
    version="2.0"
)

# ===========================
# CORS
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DATABASE
# ===========================
# ===========================
# DATABASE
# ===========================
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
from database import users_collection

users = users_collection
#===========================
# PASSWORD HASHING
# ===========================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

# ===========================
# PYDANTIC MODELS
# ===========================

class User(BaseModel):
    name: str = ""
    email: str
    password: str


class InterviewRequest(BaseModel):
    question: str
    answer: str


class FinalInterviewRequest(BaseModel):
    interview_data: list


class InterviewHistory(BaseModel):
    role: str
    score: int
    communication: int
    confidence: int
    grammar: int
    technical: int
    date: str


class CareerAssistantRequest(BaseModel):
    question: str

# ===========================
# PDF TEXT EXTRACTION
# ===========================

def extract_text(pdf_path):

    try:

        document = fitz.open(pdf_path)

        text = ""

        for page in document:
            text += page.get_text("text")

        document.close()

        return text

    except Exception as e:

        print("PDF Extraction Error:", e)

        return ""

# ===========================
# HOME
# ===========================

@app.get("/")
def home():

    return {
        "status": "success",
        "message": "AI Career Companion Backend Running 🚀"
    }

# ===========================
# REGISTER
# ===========================

@app.post("/register")
def register(user: User):

    existing = users.find_one({
        "email": user.email
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    print("Password received:", user.password)
    print("Password length:", len(user.password))

    hashed_password = pwd_context.hash(user.password)

    users.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    })

    return {
        "success": True,
        "message": "Registration Successful"
    }

# ===========================
# LOGIN
# ===========================

@app.post("/login")
def login(user: User):

    existing = users.find_one({

        "email": user.email

    })

    if not existing:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not pwd_context.verify(
        user.password,
        existing["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    return {

        "success": True,

        "token": "career_companion_token",

        "name": existing["name"],

        "email": existing["email"]

    }
# ===========================
# RESUME ANALYZER
# ===========================

@app.post("/upload_resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    if not file.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume."
        )

    os.makedirs("uploads", exist_ok=True)

    pdf_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(pdf_path, "wb") as f:
        f.write(await file.read())

    resume_text = extract_text(pdf_path)

    if resume_text.strip() == "":

        raise HTTPException(
            status_code=400,
            detail="Unable to extract text from resume."
        )

    analysis = analyze_resume(resume_text)

    return {
        "success": True,
        "analysis": analysis
    }


# ===========================
# JOB MATCHER
# ===========================

@app.post("/match_job")
async def match_job(

    resume: UploadFile = File(...),

    job_description: str = Form(...)

):

    if not resume.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Please upload PDF resume."
        )

    os.makedirs("uploads", exist_ok=True)

    pdf_path = os.path.join(
        "uploads",
        resume.filename
    )

    with open(pdf_path, "wb") as f:

        f.write(await resume.read())

    resume_text = extract_text(pdf_path)

    if resume_text.strip() == "":

        raise HTTPException(
            status_code=400,
            detail="Resume text could not be extracted."
        )

    result = match_resume_job(

        resume_text,

        job_description

    )

    return result

# ===========================
# GENERATE INTERVIEW QUESTIONS
# ===========================

@app.post("/generate_questions")
def generate_questions_api(

    role: str = Form(...)

):

    if role.strip() == "":

        raise HTTPException(

            status_code=400,

            detail="Job role cannot be empty."

        )

    questions = generate_questions(role)

    print("\n==============================")
    print("Generated Questions")
    print("==============================")

    for i, q in enumerate(questions, start=1):

        print(f"{i}. {q}")

    print("==============================\n")

    return {

        "success": True,

        "questions": questions

    }
# ===========================
# EVALUATE SINGLE ANSWER
# ===========================

@app.post("/evaluate_answer")
def evaluate_answer_api(
    answer: str = Form(...)
):

    if answer.strip() == "":

        raise HTTPException(
            status_code=400,
            detail="Answer cannot be empty."
        )

    result = evaluate_answer(
        "General Interview Question",
        answer
    )

    return {

        "success": True,

        "feedback": result

    }


# ===========================
# MOCK INTERVIEW
# ===========================

@app.post("/mock-interview")
def mock_interview(
    data: InterviewRequest
):

    try:

        feedback = evaluate_answer(
            data.question,
            data.answer
        )

        return {

            "success": True,

            "feedback": feedback

        }

    except Exception as e:

        print("Mock Interview Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ===========================
# FINAL INTERVIEW REPORT
# ===========================

@app.post("/final-interview-report")
def final_report(
    data: FinalInterviewRequest
):

    try:

        report = final_interview_report(
            data.interview_data
        )

        return {

            "success": True,

            "report": report

        }

    except Exception as e:

        print("Final Report Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    # ===========================
# SAVE INTERVIEW
# ===========================

@app.post("/save-interview")
def save_interview(
    data: InterviewHistory
):

    interview_history.insert_one(
        data.dict()
    )

    return {

        "success": True,

        "message": "Interview saved successfully."

    }


# ===========================
# INTERVIEW HISTORY
# ===========================

@app.get("/interview-history")
def get_interview_history():

    history = list(

        interview_history.find(
            {},
            {"_id": 0}
        )

    )

    history.reverse()

    return {

        "success": True,

        "history": history

    }


# ===========================
# AI CAREER ASSISTANT
# ===========================

@app.post("/career-assistant")
def ai_career_assistant(
    data: CareerAssistantRequest
):

    try:

        response = career_assistant(
            data.question
        )

        return {

            "success": True,

            "response": response

        }

    except Exception as e:

        print("Career Assistant Error:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ===========================
# BACKEND START MESSAGE
# ===========================

print("=" * 60)
print("🚀 AI Career Companion Backend Started Successfully")
print("🌐 API Running on https://ai-career-companion-bh9h.onrender.com")
print("=" * 60)