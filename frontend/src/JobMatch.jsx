import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

function JobMatch() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [job, setJob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkMatch = async () => {
    if (!resume || !job.trim()) {
      alert("Please upload your resume and paste a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", job);

    try {
      setLoading(true);

      const response = await axios.post(
  "https://ai-career-companion-rxak.onrender.com/match_job",
  formData
);

console.log(response.data);

setResult(response.data);

localStorage.setItem(
  "jobMatchScore",
  response.data.match_percentage
);

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Server not running.");
      }

    } finally {
      setLoading(false);
    }
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
        💼 AI Job Matcher
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "35px",
          fontSize: "18px",
        }}
      >
        Upload your resume and compare it with a job description using AI.
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
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
        />

        <textarea
          rows="8"
          placeholder="Paste Job Description Here..."
          value={job}
          onChange={(e) => setJob(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={checkMatch}
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
          {loading ? "Analyzing..." : "🚀 Analyze Job Match"}
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

      {result && (
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
          <div
            style={{
              width: 180,
              height: 180,
              margin: "20px auto",
            }}
          >
            <CircularProgressbar
              value={result.match_percentage}
              text={`${result.match_percentage}%`}
              styles={buildStyles({
                pathColor: "#3b82f6",
                trailColor: "#374151",
                textColor: "#ffffff",
              })}
            />
          </div>

          <h2
            style={{
              textAlign: "center",
            }}
          >
            Job Match Score
          </h2>

          <hr />

          <h3>✅ Matched Skills</h3>

          {result.matched_skills?.length ? (
            result.matched_skills.map((skill, index) => (
              <p key={index}>✔ {skill}</p>
            ))
          ) : (
            <p>No matching skills found.</p>
          )}

          <hr />

          <h3>❌ Missing Skills</h3>

          {result.missing_skills?.length ? (
            result.missing_skills.map((skill, index) => (
              <p key={index}>➕ {skill}</p>
            ))
          ) : (
            <p>Great! No missing skills.</p>
          )}

          <hr />

          <h3>💡 AI Recommendation</h3>

          <p>{result.recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default JobMatch;