import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuestionCard from "./components/QuestionCard";
import AnswerBox from "./components/AnswerBox";

function InterviewCoach() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!role.trim()) {
      alert("Please enter a target role.");
      return;
    }

    const formData = new FormData();
    formData.append("role", role);

    try {
      setLoading(true);

      const response = await axios.post(
       "https://ai-career-companion-rxak.onrender.com/generate_questions",
        formData
      );

      setQuestions(response.data.questions);
      setCurrentIndex(0);
      setAnswer("");
      setFeedback(null);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Server not running");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please type your answer.");
      return;
    }

    const formData = new FormData();
    formData.append("answer", answer);

    try {
      setLoading(true);

      const response = await axios.post(
      "https://ai-career-companion-rxak.onrender.com/evaluate_answer",
        formData
      );

      setFeedback(response.data);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Server not running");
      }
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setAnswer("");
    setFeedback(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        padding: "40px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
        }}
      >
        🎤 AI Interview Coach
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "35px",
          fontSize: "18px",
        }}
      >
        Practice AI-generated interview questions and improve your confidence.
      </p>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#1f2937",
          padding: "30px",
          borderRadius: "20px",
          border: "1px solid #374151",
        }}
      >
        <input
          placeholder="Target Role (Example: Data Analyst)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        />

        <button
          onClick={generate}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "🚀 Generate Questions"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "15px",
            background: "#374151",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {questions.length > 0 && currentIndex < questions.length && (
        <div
          style={{
            maxWidth: "900px",
            margin: "35px auto",
            background: "#1f2937",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid #374151",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            Question {currentIndex + 1} of {questions.length}
          </h2>

          <QuestionCard question={questions[currentIndex]} />

          <AnswerBox
            value={answer}
            setValue={setAnswer}
          />

          <button
            onClick={submitAnswer}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Evaluating..." : "✅ Submit Answer"}
          </button>

          {feedback && (
            <>
              <hr
                style={{
                  margin: "25px 0",
                  border: "1px solid #374151",
                }}
              />

              <h2
                style={{
                  color: "#60a5fa",
                }}
              >
                ⭐ Score : {feedback.score}/10
              </h2>

              <div
                style={{
                  background: "#111827",
                  padding: "20px",
                  borderRadius: "12px",
                  marginTop: "20px",
                }}
              >
                <h3>💡 AI Feedback</h3>

                <p
                  style={{
                    lineHeight: "1.8",
                    color: "#d1d5db",
                  }}
                >
                  {feedback.feedback}
                </p>
              </div>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    padding: "15px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  Next Question →
                </button>
              ) : (
                <h2
                  style={{
                    color: "#22c55e",
                    textAlign: "center",
                    marginTop: "25px",
                  }}
                >
                  🎉 Interview Completed!
                </h2>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default InterviewCoach;