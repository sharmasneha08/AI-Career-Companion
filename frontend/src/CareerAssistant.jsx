import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useTheme } from "./ThemeContext";
import { colors } from "./theme/theme";

function CareerAssistant() {

 const navigate = useNavigate();

const { theme } = useTheme();

  const currentTheme = colors[theme];

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Hello! I'm your AI Career Assistant.\n\nI can help you with:\n\n• Resume Improvement\n• Interview Preparation\n• Career Roadmap\n• Skill Suggestions\n• Job Search\n• Salary Guidance\n\nAsk me anything!",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  // ===========================
  // SEND MESSAGE
  // ===========================

  const sendMessage = async () => {

    if (input.trim() === "") return;

    const question = input;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {

      const response = await axios.post(

        "https://ai-career-companion-rxak.onrender.com/career-assistant",

        {

          question: question,

        }

      );

      setMessages((prev) => [

        ...prev,

        {

          sender: "ai",

          text:
  typeof response.data.response === "string"
    ? response.data.response
    : JSON.stringify(response.data.response, null, 2),

        },

      ]);

    } catch (error) {

      console.log(error);

      let message =
        "❌ Unable to connect to AI Assistant.";

      if (error.response?.data?.detail) {

        message = error.response.data.detail;

      }

      setMessages((prev) => [

        ...prev,

        {

          sender: "ai",

          text: message,

        },

      ]);

    }

    setLoading(false);

  };
    return (
    <div
      style={{
        minHeight: "100vh",
        background: currentTheme.bg,
        color: currentTheme.text,
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 35px",
          background: currentTheme.card,
          borderBottom: `1px solid ${currentTheme.border}`,
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        }}
      >

        <div>

          <h2
            style={{
              margin: 0,
              fontSize: "28px",
            }}
          >
            🤖 AI Career Assistant
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: currentTheme.subText,
            }}
          >
            Your Personal Career Mentor powered by AI
          </p>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 22px",
            border: "none",
            borderRadius: "12px",
            background: currentTheme.primary,
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ⬅ Dashboard
        </button>

      </div>

      {/* ================= CHAT ================= */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "35px",
        }}
      >

        {messages.map((msg, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "18px",
            }}
          >

            <div
              style={{
                maxWidth: "72%",
                background:
                  msg.sender === "user"
                    ? currentTheme.primary
                    : currentTheme.card,
                color: "white",
                padding: "18px",
                borderRadius: "18px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.15)",
              }}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {loading && (

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
            }}
          >

            <div
              style={{
                background: currentTheme.card,
                padding: "18px",
                borderRadius: "18px",
              }}
            >
              🤖 AI is thinking...
            </div>

          </div>

        )}

      </div>

      {/* ================= QUICK QUESTIONS ================= */}

      <div
        style={{
          padding: "0 30px 15px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >

        {[
          "Improve my Resume",
          "How can I crack interviews?",
          "Roadmap for AI Engineer",
          "Best Final Year Projects",
          "Career after B.Tech",
        ].map((item) => (

          <button
            key={item}
            onClick={() => setInput(item)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              background: currentTheme.card,
              color: currentTheme.text,
            }}
          >
            {item}
          </button>

        ))}

      </div>
            {/* ================= INPUT AREA ================= */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          padding: "25px 30px",
          background: currentTheme.card,
          borderTop: `1px solid ${currentTheme.border}`,
        }}
      >

        <input
          type="text"
          value={input}
          placeholder="Ask anything about your career..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          style={{
            flex: 1,
            padding: "16px",
            fontSize: "16px",
            borderRadius: "14px",
            border: `1px solid ${currentTheme.border}`,
            outline: "none",
            background: currentTheme.bg,
            color: currentTheme.text,
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            width: "140px",
            border: "none",
            borderRadius: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            background: currentTheme.primary,
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

      {/* ================= FOOTER ================= */}

      <div
        style={{
          textAlign: "center",
          padding: "15px",
          color: currentTheme.subText,
          fontSize: "14px",
          borderTop: `1px solid ${currentTheme.border}`,
        }}
      >
        Developed by <strong>Sneha Sharma</strong> • AI Career Companion
      </div>

    </div>
  );
}

export default CareerAssistant;