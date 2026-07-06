from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext
import fitz
import os

from analyzer import analyze_resume
from job_matcher import match_resume_job
from interview_coach import generate_questions, evaluate_answer

app = FastAPI()

# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# MongoDB
# =====================================

client = MongoClient("mongodb://localhost:27017/")
db = client["career_companion"]
users = db["users"]

# =====================================
# Password Hashing
# =====================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =====================================
# User Model
# =====================================

class User(BaseModel):
    name: str = ""
    email: str
    password: str

# =====================================
# Extract Text From PDF
# =====================================

def extract_text(pdf_path):
    """
    Extract text from uploaded PDF
    """

    try:

        doc = fitz.open(pdf_path)

        text = ""

        for page in doc:
            text += page.get_text("text")

        doc.close()

        print("\n==============================")
        print("RESUME TEXT")
        print("==============================")
        print(text)
        print("==============================\n")

        return text

    except Exception as e:

        print("PDF Extraction Error:", e)

        return ""

# =====================================
# Home
# =====================================

@app.get("/")
def home():

    return {
        "message": "AI Career Companion Backend Running"
    }

# =====================================
# Register
# =====================================

@app.post("/register")
def register(user: User):

    existing = users.find_one({
        "email": user.email
    })

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    users.insert_one({

        "name": user.name,
        "email": user.email,
        "password": pwd_context.hash(user.password)

    })

    return {

        "message": "Registration Successful"

    }

# =====================================
# Login
# =====================================

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

        "message": "Login Successful",
        "token": "career_companion_token",
        "name": existing["name"],
        "email": existing["email"]

    }
# =====================================
# Resume Analyzer
# =====================================

@app.post("/upload_resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    if not file.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Upload PDF only"
        )

    os.makedirs("uploads", exist_ok=True)

    pdf_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(pdf_path, "wb") as f:
        f.write(await file.read())

    # Correct variable name
    resume_text = extract_text(pdf_path)

    if resume_text.strip() == "":

        raise HTTPException(
            status_code=400,
            detail="Could not read resume text."
        )

    analysis = analyze_resume(resume_text)

    return {
        "analysis": analysis
    }


# =====================================
# Job Matcher
# =====================================

@app.post("/match_job")
async def match_job(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):

    if not resume.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume."
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

    print("\n========== RESUME ==========")
    print(resume_text)

    print("\n========== JOB DESCRIPTION ==========")
    print(job_description)

    result = match_resume_job(
        resume_text,
        job_description
    )

    print("\n========== JOB MATCH RESULT ==========")
    print(result)
    print("======================================\n")

    return result
# =====================================
# Interview Questions
# =====================================

@app.post("/generate_questions")
def generate(
    role: str = Form(...)
):

    if role.strip() == "":

        raise HTTPException(
            status_code=400,
            detail="Role cannot be empty."
        )

    questions = generate_questions(role)

    return {
        "questions": questions
    }


# =====================================
# Evaluate Answer
# =====================================

@app.post("/evaluate_answer")
def evaluate(
    answer: str = Form(...)
):

    if answer.strip() == "":

        raise HTTPException(
            status_code=400,
            detail="Answer cannot be empty."
        )

    result = evaluate_answer(answer)

    return result