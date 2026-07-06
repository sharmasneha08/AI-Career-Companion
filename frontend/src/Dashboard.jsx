import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();

  // ===========================
  // USER DATA
  // ===========================

  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "No Email";

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? true
  );

  const [time, setTime] = useState(new Date());

  // ===========================
  // CLOCK
  // ===========================

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ===========================
  // SAVE DARK MODE
  // ===========================

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ===========================
  // PROFILE IMAGE
  // ===========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // ===========================
  // LOGOUT
  // ===========================

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ===========================
  // THEME
  // ===========================

  const theme = {
    bg: darkMode ? "#0b1120" : "#f1f5f9",

    sidebar: darkMode ? "#111827" : "#ffffff",

    card: darkMode ? "#1e293b" : "#ffffff",

    text: darkMode ? "#ffffff" : "#111827",

    subText: darkMode ? "#94a3b8" : "#64748b",

    border: darkMode ? "#334155" : "#e2e8f0",

    primary: "#2563eb",

    secondary: "#7c3aed",
  };

  // ===========================
  // CARD STYLE
  // ===========================

  const cardStyle = {
    background: theme.card,

    color: theme.text,

    borderRadius: "18px",

    padding: "22px",

    border: `1px solid ${theme.border}`,

    boxShadow: darkMode
      ? "0 10px 30px rgba(0,0,0,.35)"
      : "0 10px 30px rgba(0,0,0,.08)",

    transition: ".3s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        background: theme.bg,

        color: theme.text,
      }}
    >

      {/* ===========================
            SIDEBAR
      ============================ */}

      <div
        style={{
          width: "260px",

          background: theme.sidebar,

          padding: "25px",

          borderRight: `1px solid ${theme.border}`,

          display: "flex",

          flexDirection: "column",

          justifyContent: "space-between",
        }}
      >

        <div>

          <h2
            style={{
              marginBottom: "35px",

              color: theme.primary,
            }}
          >
            🚀 AI Career
          </h2>

          <div
            style={{
              marginBottom: "18px",

              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            🏠 Dashboard
          </div>

          <div
            style={{
              marginBottom: "18px",

              cursor: "pointer",
            }}
            onClick={() => navigate("/resume")}
          >
            📄 Resume Analyzer
          </div>

          <div
            style={{
              marginBottom: "18px",

              cursor: "pointer",
            }}
            onClick={() => navigate("/job-match")}
          >
            💼 Job Matcher
          </div>

          <div
            style={{
              marginBottom: "18px",

              cursor: "pointer",
            }}
            onClick={() => navigate("/interview")}
          >
            🎤 Interview Coach
          </div>

        </div>

        <div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: "100%",

              padding: "12px",

              border: "none",

              borderRadius: "12px",

              background: theme.primary,

              color: "white",

              marginBottom: "12px",

              cursor: "pointer",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            onClick={logout}
            style={{
              width: "100%",

              padding: "12px",

              border: "none",

              borderRadius: "12px",

              background: "#ef4444",

              color: "white",

              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>

        </div>

      </div>

      {/* ===========================
            MAIN CONTENT STARTS HERE
      ============================ */}

      <div
        style={{
          flex: 1,

          padding: "30px",
        }}
      >
                {/* ===========================
              TOP NAVBAR
        ============================ */}

        <div
          style={{
            ...cardStyle,
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                marginBottom: "5px",
              }}
            >
              Welcome back, {username} 👋
            </h2>

            <p
              style={{
                margin: 0,
                color: theme.subText,
              }}
            >
              {time.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {" • "}
              {time.toLocaleTimeString()}
            </p>
          </div>

          <div
            style={{
              background: theme.primary,
              color: "white",
              padding: "10px 18px",
              borderRadius: "25px",
              fontWeight: "bold",
            }}
          >
            🚀 Premium Dashboard
          </div>
        </div>

        {/* ===========================
              PROFILE CARD
        ============================ */}

        <div
          style={{
            ...cardStyle,
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            flexWrap: "wrap",
          }}
        >

          {/* Hidden File Input */}

          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImage}
            style={{ display: "none" }}
          />

          {/* Profile Photo */}

          <label
            htmlFor="profileUpload"
            style={{
              cursor: "pointer",
              position: "relative",
            }}
          >

            <img
              src={
                profileImage ||
                `https://ui-avatars.com/api/?name=${username}&background=2563eb&color=fff&size=256`
              }
              alt="Profile"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid white",
                boxShadow: "0 15px 35px rgba(0,0,0,.25)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: theme.primary,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "3px solid white",
                fontSize: "18px",
              }}
            >
              📷
            </div>

          </label>

          {/* User Information */}

          <div style={{ flex: 1 }}>

            <h2
              style={{
                marginTop: 0,
                marginBottom: "12px",
              }}
            >
              {username}
            </h2>

            <p
              style={{
                color: theme.subText,
                marginBottom: "10px",
              }}
            >
              📧 {email}
            </p>

            <p
              style={{
                color: theme.subText,
                marginBottom: "10px",
              }}
            >
              💼 AI Career Companion User
            </p>

            <p
              style={{
                color: theme.subText,
                marginBottom: "18px",
              }}
            >
              🟢 Status : Active
            </p>

          </div>

        </div>
                {/* ===========================
              ANALYTICS CARDS
        ============================ */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "25px",
          }}
        >

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>📄 Resume Score</h3>

            <h1
              style={{
                color: "#22c55e",
                margin: "10px 0",
              }}
            >
              92%
            </h1>

            <p style={{ color: theme.subText }}>
              Excellent ATS Compatibility
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>💼 Job Matches</h3>

            <h1
              style={{
                color: "#2563eb",
                margin: "10px 0",
              }}
            >
              24
            </h1>

            <p style={{ color: theme.subText }}>
              Recommended Jobs
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>🎤 Interview Score</h3>

            <h1
              style={{
                color: "#7c3aed",
                margin: "10px 0",
              }}
            >
              88%
            </h1>

            <p style={{ color: theme.subText }}>
              AI Confidence Level
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>🤖 AI Assistant</h3>

            <h1
              style={{
                color: "#f59e0b",
                margin: "10px 0",
              }}
            >
              Online
            </h1>

            <p style={{ color: theme.subText }}>
              Ready to Help
            </p>
          </div>

        </div>

        {/* ===========================
              AI TOOLS
        ============================ */}

        <h2
          style={{
            marginBottom: "18px",
          }}
        >
          AI Career Tools
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              ...cardStyle,
              cursor: "pointer",
            }}
            onClick={() => navigate("/resume")}
          >
            <h2>📄 Resume Analyzer</h2>

            <p
              style={{
                color: theme.subText,
                lineHeight: "1.7",
              }}
            >
              Upload your resume and receive an ATS score,
              skill detection, AI suggestions and improvement
              recommendations instantly.
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              cursor: "pointer",
            }}
            onClick={() => navigate("/job-match")}
          >
            <h2>💼 Job Matcher</h2>

            <p
              style={{
                color: theme.subText,
                lineHeight: "1.7",
              }}
            >
              Compare your resume with any job description
              and calculate your matching percentage using AI.
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              cursor: "pointer",
            }}
            onClick={() => navigate("/interview")}
          >
            <h2>🎤 Interview Coach</h2>

            <p
              style={{
                color: theme.subText,
                lineHeight: "1.7",
              }}
            >
              Practice AI-generated interview questions
              and receive instant AI feedback.
            </p>
          </div>

        </div>

        {/* ===========================
              CAREER INSIGHTS
        ============================ */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <div style={cardStyle}>

            <h2>💡 Career Tip</h2>

            <p
              style={{
                color: theme.subText,
                lineHeight: "1.8",
              }}
            >
              Recruiters usually spend less than 10 seconds
              scanning a resume.

              Keep your resume updated with internships,
              certifications, projects, achievements and
              technical skills to improve your chances
              of getting shortlisted.
            </p>

          </div>

          <div style={cardStyle}>

            <h2>🔥 Trending Skills</h2>

            <ul
              style={{
                color: theme.subText,
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              <li>React.js</li>
              <li>Python</li>
              <li>FastAPI</li>
              <li>MongoDB</li>
              <li>Artificial Intelligence</li>
            </ul>

          </div>

        </div>
                {/* ===========================
              PROFILE SUMMARY + ACTIVITY
        ============================ */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "30px",
          }}
        >

          <div style={cardStyle}>

            <h2>👤 Profile Summary</h2>

            <p><strong>Name:</strong> {username}</p>

            <p><strong>Email:</strong> {email}</p>

            <p><strong>Account:</strong> Premium User</p>

            <p><strong>Status:</strong> Active ✅</p>

            <p><strong>Member Since:</strong> 2025</p>

          </div>

          <div style={cardStyle}>

            <h2>📈 Recent Activity</h2>

            <ul
              style={{
                lineHeight: "2",
                color: theme.subText,
                paddingLeft: "20px",
              }}
            >
              <li>Resume analyzed successfully</li>
              <li>Job matching completed</li>
              <li>Interview practice started</li>
              <li>AI suggestions generated</li>
            </ul>

          </div>

        </div>

        
        {/* ===========================
              FOOTER
        ============================ */}

        <div
          style={{
            ...cardStyle,
            textAlign: "center",
          }}
        >

          <h2
            style={{
              marginBottom: "10px",
              color: theme.primary,
            }}
          >
            🚀 AI Career Companion
          </h2>

          <p
            style={{
              color: theme.subText,
              marginBottom: "10px",
            }}
          >
            Resume Analyzer • Job Matcher • Interview Coach
          </p>

          <p
            style={{
              color: theme.subText,
            }}
          >
            Developed by <strong>Sneha Sharma</strong> ❤️
          </p>

          <p
            style={{
              color: theme.subText,
              fontSize: "13px",
              marginTop: "10px",
            }}
          >
            © {new Date().getFullYear()} AI Career Companion.
            All Rights Reserved.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;