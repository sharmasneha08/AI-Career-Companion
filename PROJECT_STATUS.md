# AI Career Companion — Project Status

## What was added in this pass

**Frontend (`frontend/src/`)**
- `App.jsx` — now uses `react-router-dom` with real routes instead of a single login/dashboard toggle.
- `Login.jsx` — updated to `navigate("/dashboard")` after a successful login instead of using a `setLoggedIn` prop.
- `Dashboard.jsx` — **new**. Shows the three feature buttons and routes to each page.
- `ResumeAnalyzer.jsx` — **new**. Uploads a PDF to `POST /upload_resume` and displays the skill/score analysis.
- `JobMatch.jsx` — **new** (replaces the old stray `frontend/JobMatchPage.jsx`, which lived outside `src/` and was never imported anywhere). Uploads a resume + job description to `POST /match_job`.
- `InterviewCoach.jsx` — **new**. Uses the existing `components/QuestionCard.jsx` and `components/AnswerBox.jsx` to walk through questions from `POST /generate_questions` and grade answers via `POST /evaluate_answer`.
- `package.json` — added `react-router-dom` as a dependency.

**Backend (`backend/`)**
- `requirements.txt` — was empty; filled in with the packages `main.py`, `auth.py`, and `database.py` actually import (`fastapi`, `uvicorn`, `pymongo`, `pymupdf`, `python-multipart`, `python-dotenv`, `passlib[bcrypt]`, `python-jose`, `pydantic`).

## Routes (frontend)

| Path          | Page              |
|---------------|-------------------|
| `/login`      | Login / Register  |
| `/dashboard`  | Dashboard         |
| `/resume`     | Resume Analyzer   |
| `/job-match`  | Job Match         |
| `/interview`  | Interview Coach   |

All routes except `/login` require a `token` in `localStorage` (set on successful login) — otherwise you're redirected back to `/login`.

## How to run

**Backend**
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017` (used directly in `main.py`).

**Frontend**
```
cd frontend
npm install
npm run dev
```

## Known inconsistency (not changed, flagging for you)

`main.py` has its own inline `/register` and `/login` endpoints that store **plaintext passwords** directly in MongoDB. There's a separate, more secure implementation in `auth.py` (using `passlib` bcrypt hashing + JWT) backed by `database.py` and `models.py` — but it's never wired into `main.py` via `include_router`, so it's currently dead code.

I left this alone since changing it would change your login behavior, but if you want production-grade auth, the fix is:
1. In `main.py`, remove the inline `User` model, `/register`, and `/login` routes.
2. Add `from auth import router as auth_router` and `app.include_router(auth_router)`.

Happy to make that change if you want it.
