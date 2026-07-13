<div align="center">

# 🚀 AI Career Companion

### AI-Powered Career Development Platform

An intelligent web application that helps students and job seekers improve their career journey through AI-powered Resume Analysis, Job Matching, Mock Interviews, Career Guidance, and Interview Performance Tracking.

---

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)
![Python](https://img.shields.io/badge/Python-3.12-yellow?style=for-the-badge&logo=python)
![AI](https://img.shields.io/badge/AI-Groq%20%7C%20Gemini-red?style=for-the-badge)

</div>

---

# 🌟 Project Overview

Finding a job requires much more than just creating a resume.

Students often struggle with:

- Writing ATS-friendly resumes
- Matching resumes with job descriptions
- Preparing for interviews
- Understanding missing skills
- Receiving personalized career guidance

AI Career Companion solves these problems using Artificial Intelligence.

This platform combines multiple AI-powered tools into one complete career preparation system.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Dashboard

---

## 📄 Resume Analyzer

Upload your resume and receive:

- Resume Score
- ATS Compatibility
- Skills Extraction
- Missing Skills
- Resume Suggestions
- AI Recommendations

---

## 💼 Job Matcher

Compare your resume with any Job Description.

Features include:

- Match Percentage
- Matching Skills
- Missing Skills
- AI Suggestions
- Career Improvement Tips

---

## 🎤 AI Mock Interview

Prepare for interviews with AI-generated questions.

Supports:

- HR Interviews
- Technical Interviews
- Behavioral Interviews

Features:

- AI Question Generation
- AI Answer Evaluation
- Score Calculation
- Feedback
- Interview History

---

## 🤖 AI Career Assistant

An intelligent chatbot capable of answering career-related questions.

Examples:

- Career Roadmaps
- Resume Improvement
- Interview Preparation
- Learning Resources
- Placement Guidance
- Skill Recommendations

---

## 😀 Face Detection

Integrated Face Detection during interviews.

Capabilities:

- Face Presence Detection
- Basic Expression Monitoring
- User Attention Detection

This creates a realistic interview environment.

---

## 🌙 Modern Dashboard

- Beautiful UI
- Responsive Design
- Dark Theme
- Easy Navigation
- Clean Layout

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- Face-api.js
- CSS3

---

## Backend

- FastAPI
- Python
- REST API
- JWT Authentication

---

## Database

- MongoDB

---

## AI Services

- Groq API
- Google Gemini AI

---

# 📂 Project Structure

```
AI-Career-Companion/

├── backend/
│   ├── analyzer.py
│   ├── auth.py
│   ├── database.py
│   ├── gemini_ai.py
│   ├── interview_coach.py
│   ├── job_matcher.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │    └── models/
│   │
│   ├── src/
│   │    ├── CareerAssistant.jsx
│   │    ├── Dashboard.jsx
│   │    ├── InterviewCoach.jsx
│   │    ├── JobMatch.jsx
│   │    ├── Login.jsx
│   │    ├── MockInterview.jsx
│   │    ├── ResumeAnalyzer.jsx
│   │    ├── ThemeContext.jsx
│   │    ├── context/
│   │    └── theme/
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/sharmasneha08/AI-Career-Companion.git
```

---

## Backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file.

```
GROQ_API_KEY=your_key

MONGODB_URL=your_database

SECRET_KEY=your_secret_key
```

⚠ Never upload API keys to GitHub.

---

# 📸 Screenshots

> Replace these placeholders with your project screenshots.

## Login

<img src="screenshots/login.png" width="900"/>

---

## Dashboard

<img src="screenshots/dashboard.png" width="900"/>

---

## Resume Analyzer

<img src="screenshots/resume.png" width="900"/>

---

## Job Matcher

<img src="screenshots/jobmatch.png" width="900"/>

---

## Mock Interview

<img src="screenshots/interview.png" width="900"/>

---

## Career Assistant

<img src="screenshots/chatbot.png" width="900"/>

---

# 🎯 Future Improvements

- Voice Interview
- Speech Emotion Detection
- Resume Builder
- Cover Letter Generator
- AI Roadmap Generator
- Job Recommendation Engine
- Cloud Deployment

---

# 💡 Learning Outcomes

This project helped me gain practical experience with:

- Full Stack Development
- REST APIs
- React Routing
- MongoDB Integration
- Authentication
- AI API Integration
- Resume Parsing
- Face Detection
- State Management
- Component-based Architecture

---

# 👩‍💻 Developer

## Sneha Sharma

Computer Science Engineering Student

GitHub:

https://github.com/sharmasneha08

---

# ⭐ Show Your Support

If you found this project useful,

⭐ Star the repository.

---

# 📜 License

This project is intended for educational and portfolio purposes.
