import { useState, useRef, useEffect } from "react";
import "./MockInterview.css";
import axios from "axios";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import { useTheme } from "./ThemeContext";
import { colors } from "./theme/theme";
function MockInterview() {

  // ===========================
  // STATES
  // ===========================

  const [questions, setQuestions] = useState([
    "Tell me about yourself.",
    "Why should we hire you?",
    "Describe one challenging project you worked on.",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?"
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [role, setRole] = useState("");

  const [answer, setAnswer] = useState("");

  const [feedback, setFeedback] = useState(
    "Your AI feedback will appear here after submitting your answer."
  );

  const [overallScore, setOverallScore] = useState(0);

  const [communication, setCommunication] = useState(0);

  const [confidence, setConfidence] = useState(0);

  const [grammar, setGrammar] = useState(0);

  const [technical, setTechnical] = useState(0);

  const [strengths, setStrengths] = useState([]);

  const [improvements, setImprovements] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);
const [interviewCompleted, setInterviewCompleted] = useState(false);
const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [isListening, setIsListening] = useState(false);
const videoRef = useRef(null);
const intervalRef = useRef(null);
const timerRef = useRef(null);
const [cameraOn, setCameraOn] = useState(false);
const [faceDetected, setFaceDetected] = useState(false);
const [eyeContact, setEyeContact] = useState("Looking...");
const [seconds, setSeconds] = useState(0);
const [voiceScore, setVoiceScore] = useState(0);
const [cameraScore, setCameraScore] = useState(0);
const [completionScore, setCompletionScore] = useState(0);
const [interviewData, setInterviewData] = useState([]);
const [history, setHistory] = useState([]);
const recognitionRef = useRef(null);
 const modelRef = useRef(null);
 
 
// ===========================
// LIVE CONFIDENCE SCORE
// ===========================
const [liveScore, setLiveScore] = useState(40);

useEffect(() => {

  let score = 40;

  if (cameraOn) score += 20;

  if (faceDetected) score += 20;

  if (isListening) score += 20;

  if (answer.trim().length > 100) score += 20;

  setLiveScore(Math.min(score, 100));

}, [cameraOn, faceDetected, isListening, answer]);

// ===========================
// LOAD BLAZEFACE MODEL
// ===========================
useEffect(() => {

  const loadModel = async () => {

    await tf.ready();

    modelRef.current = await blazeface.load();

    console.log("✅ BlazeFace Loaded");

  };

  loadModel();

}, []);
useEffect(() => {

  const savedHistory = JSON.parse(
    localStorage.getItem("interviewHistory")
  ) || [];

  setHistory(savedHistory);

}, []);
// ===========================
// START CAMERA
// ===========================
const startCamera = async () => {
  try {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    videoRef.current.srcObject = stream;

    videoRef.current.onloadeddata = async () => {

      await videoRef.current.play();

      setCameraOn(true);

      intervalRef.current = setInterval(() => {
  console.log("Running detectFace...");
  detectFace();
}, 1000);

      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      console.log("✅ Video Ready");

    };

  } catch (error) {
    console.log(error);
    alert("Unable to access webcam.");
  }
};

// ===========================
// DETECT FACE
// ===========================
const detectFace = async () => {

  if (!videoRef.current || !modelRef.current) return;

  const predictions = await modelRef.current.estimateFaces(videoRef.current);

  console.log("Predictions:", predictions);

  if (predictions.length > 0) {

    console.log("😊 Face Detected");

    setFaceDetected(true);
    setCameraScore(100);

  } else {

    console.log("❌ No Face");

    setFaceDetected(false);
   setCameraScore(0);
  }
};

// ===========================
// STOP CAMERA
// ===========================

const stopCamera = () => {
window.speechSynthesis.cancel();

if (videoRef.current?.srcObject) {
  videoRef.current.srcObject
    .getTracks()
    .forEach(track => track.stop());
}

if (intervalRef.current) {
  clearInterval(intervalRef.current);
}

if (timerRef.current) {
  clearInterval(timerRef.current);
}
};
  // ===========================
  // SPEECH RECOGNITION
  // ===========================

  const startListening = async () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    try {

      window.speechSynthesis.cancel();

      await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
setVoiceScore(100);
        console.log("Listening...");

        setIsListening(true);

      };

      recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript;

        console.log(transcript);

        setAnswer(transcript);

      };

      recognition.onerror = (event) => {

  console.log("Speech Error:", event.error);

  setIsListening(false);

  if (event.error === "aborted") {
    return;
  }

  if (event.error === "no-speech") {

    alert("No speech detected. Please speak immediately after clicking.");

  } else {

    alert("Speech Error: " + event.error);

  }

      };

      recognition.onend = () => {

        setIsListening(false);

      };

      recognitionRef.current = recognition;

      recognition.start();

    }

    catch (err) {

      console.log(err);

      alert("Microphone access failed.");

    }

  };
    // ===========================
  // SUBMIT ANSWER
  // ===========================
const handleSubmit = async () => {

  if (answer.trim() === "") {
    alert("Please answer the question first.");
    return;
  }

  const currentAnswer = {
    question: questions[currentQuestion],
    answer: answer,
  };

  const updatedInterviewData = [
    ...interviewData,
    currentAnswer,
  ];

  setInterviewData(updatedInterviewData);

  try {

    setLoading(true);

    setFeedback("🤖 AI is analyzing your answer...");

    const response = await axios.post(
      "https://ai-career-companion-rxak.onrender.com/mock-interview",
      currentAnswer
    );

    console.log(JSON.stringify(response.data, null, 2));

    if (response.data.success) {

      const result = response.data.feedback;
      console.log("FULL AI RESULT:", result);
console.log("Strengths:", result.strengths);
console.log("Improvements:", result.improvements);
     
      setFeedback(result.feedback);

      setOverallScore(result.overall_score);

      setCommunication(result.communication);

      setConfidence(result.confidence);

      setGrammar(result.grammar);

      setTechnical(result.technical);

      setStrengths(result.strengths || []);

      setImprovements(result.improvements || []);
      setShowResult(true);

      console.log(result.strengths);
      console.log(result.improvements);

      // ===============================
      // LAST QUESTION
      // ===============================
      if (currentQuestion === questions.length - 1) {
console.log(
  "Current Question:",
  currentQuestion
);

console.log(
  "Total Questions:",
  questions.length
);
        const finalResponse = await axios.post(
          "https://ai-career-companion-rxak.onrender.comfinal-interview-report",
          {
            interview_data: updatedInterviewData,
          }
        );

        console.log(finalResponse.data);

        const report = finalResponse.data.report;

if (!report) {
  alert("Final interview report was not generated.");
  console.log(finalResponse.data);
  return;
}

const aiScore = report.overall_score;
        const completion =
          ((currentQuestion + 1) / questions.length) * 100;

        setCompletionScore(completion);

        const finalScore = Math.round(
          aiScore * 0.60 +
          voiceScore * 0.15 +
          cameraScore * 0.15 +
          completion * 0.10
        );
localStorage.setItem(
  "interviewScore",
  finalScore
);
        setOverallScore(finalScore);

        setCommunication(report.communication);

        setConfidence(report.confidence);

        setGrammar(report.grammar);

        setTechnical(report.technical);

        setStrengths(report.strengths || []);

        setImprovements(report.improvements || []);

        setFeedback(report.summary);

        setShowResult(true);
const interviewRecord = {
  role,
  score: finalScore,
  communication: report.communication,
  confidence: report.confidence,
  grammar: report.grammar,
  technical: report.technical,
  date: new Date().toLocaleString(),
};

const savedHistory =
  JSON.parse(localStorage.getItem("interviewHistory")) || [];

const updatedHistory = [
  interviewRecord,
  ...savedHistory,
];

setHistory(updatedHistory);

localStorage.setItem(
  "interviewHistory",
  JSON.stringify(updatedHistory)
);
setHistory(updatedHistory);

localStorage.setItem(
  "interviewHistory",
  JSON.stringify(updatedHistory)
);
        setInterviewCompleted(true);

        stopCamera();
      }

      setTotalQuestionsAnswered(currentQuestion + 1);

    } else {

      setFeedback("Unable to evaluate answer.");

    }

  } catch (error) {

    console.log(error);

    if (error.response) {

      setFeedback(error.response.data.detail);

    } else {

      setFeedback("Unable to connect to backend.");

    }

  } finally {

    setLoading(false);

  }

};
  // ===========================
  // GENERATE AI QUESTIONS
  // ===========================

  const generateQuestions = async () => {

    if (role.trim() === "") {

      alert("Please enter a job role.");

      return;

    }

    try {

      const response = await axios.post(
        "https://ai-career-companion-rxak.onrender.com/generate_questions",
        new URLSearchParams({
          role: role,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
console.log("Questions received:", response.data.questions.length);
console.log(response.data.questions);
      
const generatedQuestions = response.data.questions;

setQuestions(generatedQuestions);

setCurrentQuestion(0);

setAnswer("");

setFeedback(
  "Your AI feedback will appear here after submitting your answer."
);

setShowResult(false);

alert("AI Questions Generated Successfully!");

startCamera();

setTimeout(() => {

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(

`Welcome to your AI Mock Interview.

Today's interview is for ${role}.

Let's begin.

${generatedQuestions[0]}`

  );

  speech.lang = "en-US";

  window.speechSynthesis.speak(speech);

},1500);
    } catch (error) {

      console.log(error);

      alert("Unable to generate AI questions.");

    }

  };

  // ===========================
  // NEXT QUESTION
  // ===========================
const nextQuestion = () => {

  if (currentQuestion < questions.length - 1) {

    const next = currentQuestion + 1;

    setCurrentQuestion(next);

    setAnswer("");

    setFeedback(
      "Your AI feedback will appear here after submitting your answer."
    );

   

    setTimeout(() => {

      window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
  questions[next]
);

speech.lang = "en-US";
speech.rate = 0.95;
speech.pitch = 1;
speech.volume = 1;

window.speechSynthesis.speak(speech);
    }, 500);

  } else {

    stopCamera();

    setInterviewCompleted(true);

  }

};
  
    // ===========================
  // SPEAK QUESTION
  // ===========================
  const speakQuestion = () => {

    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support Text-to-Speech.");
      return;
    }

    window.speechSynthesis.cancel();

    let text = "";

   text = `Welcome to your AI Mock Interview.

Today's interview is for ${role}.

Let's begin.

${questions[currentQuestion]}`;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 0.95;

    speech.pitch = 1;

    speech.volume = 1;

    speech.onstart = () => {

      console.log("AI Speaking...");

    };

    speech.onend = () => {

      console.log("Finished Speaking");

    };

    speech.onerror = (e) => {

      console.log(e);

    };

    setTimeout(() => {

      window.speechSynthesis.speak(speech);

    }, 300);

  };
const progress =
  questions.length > 0
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;
  // ===========================
  // RETURN
  // ===========================
const minutes = Math.floor(seconds / 60);
const remainingSeconds = seconds % 60;
  return (

    <div className="mock-page">

      <div className="mock-container">

        {/* HEADER */}

        <div className="top-section">

          <div>

            <h1>🎤 AI Mock Interview</h1>

            <p>
              Practice interviews with Gemini AI and improve your confidence.
            </p>

          </div>

          <div className="question-count">

{
questions.length === 0
?
"Question 0/0"
:
`Question ${currentQuestion+1}/${questions.length}`
}

</div>
<div
  style={{
    width: "100%",
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "15px",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      width: `${progress}%`,
      height: "100%",
      background: "#4f46e5",
      transition: "0.4s",
    }}
  />
</div>

<p
  style={{
    textAlign: "right",
    color: "#555",
    marginBottom: "20px",
  }}
>
  {Math.round(progress)}% Completed
</p>
        </div>

        {/* JOB ROLE */}

        <div className="question-card">

          <h2>💼 Job Role</h2>

          <input
            type="text"
            placeholder="Example: Front Stack Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "10px",
              fontSize: "16px"
            }}
          />

          <button
            className="primary-btn"
            style={{
              marginTop: "15px",
              width: "100%"
            }}
            onClick={generateQuestions}
          >
            🤖 Generate AI Questions
          </button>

        </div>
{/* ===========================
      CAMERA
=========================== */}
<div className="question-card">

  <h2
  style={{
    marginBottom: "15px",
    textAlign: "center",
  }}
>
  🎥 Live Interview Camera
</h2>

<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "40px",
    marginTop: "20px",
  }}
>

  {/* LEFT SIDE - CAMERA */}
  <div>
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{
        width: "420px",
        height: "320px",
        borderRadius: "15px",
        objectFit: "contain",
        border: "2px solid #4f46e5",
        background: "#000",
      }}
    />
  </div>

  {/* RIGHT SIDE - CONTROLS */}
  <div
    style={{
      width: "280px",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    }}
  >

    <div>
      <strong>Status</strong>
      <br />
      {faceDetected ? "🟢 Face Detected" : "🔴 No Face"}
    </div>

    <div>
      <strong>Timer</strong>
      <br />
      {String(Math.floor(seconds / 60)).padStart(2, "0")}:
      {String(seconds % 60).padStart(2, "0")}
    </div>

    <div>
      <strong>Live Score</strong>
      <br />
      ⭐ {liveScore}
    </div>

    <button
      className="primary-btn"
      onClick={startCamera}
    >
      ▶ Start Camera
    </button>

    <button
      className="secondary-btn"
      onClick={stopCamera}
    >
      ⏹ Stop Camera
    </button>

  </div>

</div>
</div>
        {/* QUESTION */}

        <div className="question-card">
          <div
  className="question-card"
  style={{
    padding: "25px",
  }}
>

</div>

          <h2>Interview Question</h2>

          <h3>{questions[currentQuestion]}</h3>

        </div>

        {/* ANSWER */}

        <div className="answer-card">

          <h2>Your Answer</h2>

          <textarea
            placeholder="Type your answer or click Start Speaking..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <div className="button-group">

            <button
              className="primary-btn"
              onClick={startListening}
              disabled={isListening}
            >
              {isListening ? "🎤 Listening..." : "🎙️ Start Speaking"}
            </button>

            <button
              className="secondary-btn"
              onClick={speakQuestion}
            >
              🔊 Read Question
            </button>

            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "🤖 Analyzing..." : "📤 Submit Answer"}
            </button>

            <button
              className="secondary-btn"
              onClick={nextQuestion}
            >
              ➜ Next Question
            </button>

          </div>

        </div>
              {/* ===========================
              GEMINI FEEDBACK
        =========================== */}

        <div className="feedback-card">

          <h2>🤖 Gemini AI Feedback</h2>

          <div className="feedback-box">

            <p
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.8"
              }}
            >
              {feedback}
            </p>

          </div>

        </div>

        {/* ===========================
              INTERVIEW RESULT
        =========================== */}

        {showResult && (

          <div className="feedback-card">

            <h2>🏆 Interview Result</h2>

            <br />

            <h3>Overall Score</h3>

            <div
              style={{
                width: "100%",
                height: "18px",
                background: "#e5e7eb",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${overallScore}%`,
                  height: "100%",
                  background: "#22c55e"
                }}
              />
            </div>

            <h2
              style={{
                color: "#22c55e",
                marginTop: "10px"
              }}
            >
              {overallScore}/100
            </h2>

            <hr />

            <h3>📊 Performance</h3>
          <p>
  <strong>🤖 AI Answer:</strong> {overallScore}%
</p>

<p><strong>🎤 Voice Participation:</strong> {voiceScore}%</p>

<p><strong>📷 Camera Presence:</strong> {cameraScore}%</p>

<p><strong>✅ Interview Completion:</strong> {Math.round(completionScore)}%</p>

<hr />

            <p><strong>Communication:</strong> {communication}/10</p>

            <p><strong>Confidence:</strong> {confidence}/10</p>

            <p><strong>Grammar:</strong> {grammar}/10</p>

            <p><strong>Technical Knowledge:</strong> {technical}/10</p>

            <hr />

            <h3>⭐ Strengths</h3>

            <ul>

              {strengths.length > 0 ? (

                strengths.map((item, index) => (

                  <li key={index}>{item}</li>

                ))

              ) : (

                <li>No strengths available.</li>

              )}

            </ul>

            <hr />

            <h3>📈 Improvements</h3>

            <ul>

              {improvements.length > 0 ? (

                improvements.map((item, index) => (

                  <li key={index}>{item}</li>

                ))

              ) : (

                <li>No improvements available.</li>

              )}

            </ul>
            <hr />

<h3>🎯 Recommendation</h3>

<h2
  style={{
    color:
      overallScore >= 80
        ? "green"
        : overallScore >= 60
        ? "#f59e0b"
        : "red",
  }}
>
  {overallScore >= 80
    ? "✅ Strong Hire"
    : overallScore >= 60
    ? "🟡 Consider"
    : "❌ Needs Improvement"}
</h2>

          </div>

        )}
{interviewCompleted && (
  <div className="feedback-card">

    <h2>🎉 Interview Summary</h2>

<br />

<p>
  <strong>Questions Answered:</strong> {totalQuestionsAnswered}
</p>

<p>
  <strong>Interview Duration:</strong>{" "}
  {String(minutes).padStart(2, "0")}:
  {String(remainingSeconds).padStart(2, "0")}
</p>

<p>
  <strong>Final Score:</strong> {overallScore}/100
</p>

<p>
  <strong>Communication:</strong> {communication}/10
</p>

<p>
  <strong>Confidence:</strong> {confidence}/10
</p>

<p>
  <strong>Grammar:</strong> {grammar}/10
</p>

<p>
  <strong>Technical:</strong> {technical}/10
</p>

    <h3>🏆 Recommendation</h3>

    <p>
      {overallScore >= 80
        ? "Excellent! You are interview ready."
        : overallScore >= 60
        ? "Good performance. Practice a little more."
        : "Keep practicing. You will improve quickly."}
    </p>

  </div>
)}
<div className="feedback-card">

  <h2>📜 Interview History</h2>

  {history.length === 0 ? (

    <p>No interview history yet.</p>

  ) : (

    history.map((item, index) => (

      <div
        key={index}
        style={{
          borderBottom: "1px solid #ddd",
          padding: "12px 0",
        }}
      >
        <p><strong>💼 Role:</strong> {item.role}</p>

        <p><strong>🏆 Score:</strong> {item.score}/100</p>

        <p><strong>📅 Date:</strong> {item.date}</p>
      </div>

    ))

  )}

</div>
        {/* ===========================
              INTERVIEW TIPS
        =========================== */}

        <div className="tips-card">

          <h2>💡 Interview Tips</h2>

          <ul>

            <li>✔ Introduce yourself confidently in 30–60 seconds.</li>

            <li>✔ Use the STAR Method (Situation, Task, Action, Result).</li>

            <li>✔ Give real project examples.</li>

            <li>✔ Avoid filler words like "umm", "actually", and "basically".</li>

            <li>✔ Speak clearly and confidently.</li>

            <li>✔ Maintain eye contact while practicing.</li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default MockInterview;  