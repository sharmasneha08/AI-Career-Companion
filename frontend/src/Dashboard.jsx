import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";
import { colors } from "./theme/theme";

function Dashboard() {

  const navigate = useNavigate();

  const { theme: mode, toggleTheme } = useTheme();

  const currentTheme = colors[mode];

  // ===========================
  // USER DATA
  // ===========================

  const username =
    localStorage.getItem("username") || "Sneha";

  const email =
    localStorage.getItem("email") ||
    "sneha@gmail.com";

  const profileImage =
    localStorage.getItem("profileImage") || "";

   const fileInputRef = useRef(null);

const handleProfileChange = (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    localStorage.setItem(
      "profileImage",
      reader.result
    );

    window.location.reload();

  };

  reader.readAsDataURL(file);

}; 
  const resumeScore =
    Number(localStorage.getItem("resumeScore")) || 0;

  const interviewScore =
    Number(localStorage.getItem("interviewScore")) || 0;

  const totalInterviews =
    Number(localStorage.getItem("totalInterviews")) || 0;

 const jobMatchScore =
  Number(localStorage.getItem("jobMatchScore")) || 0;

  // ===========================
  // CLOCK
  // ===========================

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    },1000);

    return ()=>clearInterval(timer);

  },[]);

  // ===========================
  // CARD STYLE
  // ===========================

  const cardStyle = {

    background: currentTheme.card,

    borderRadius: "22px",

    padding: "24px",

    border: `1px solid ${currentTheme.border}`,

    color: currentTheme.text,

    boxShadow:
      mode === "dark"
        ? "0 12px 35px rgba(0,0,0,.30)"
        : "0 12px 35px rgba(0,0,0,.08)",

    transition: ".25s",

  };

  return (

<div
style={{
display:"flex",
minHeight:"100vh",
background:currentTheme.bg,
color:currentTheme.text,
}}

>

{/* ===========================
        SIDEBAR
=========================== */}

<div

style={{

width:"250px",

background:currentTheme.sidebar,

padding:"30px",

borderRight:`1px solid ${currentTheme.border}`,

display:"flex",

flexDirection:"column",

justifyContent:"space-between",

}}

>

<div>

<h2

style={{

marginBottom:"45px",

color:currentTheme.primary,

}}

>

🚀 AI Career

</h2>

<div

style={{
padding:"14px 0",
cursor:"pointer",
}}

onClick={()=>navigate("/dashboard")}

>

🏠 Dashboard

</div>

<div

style={{
padding:"14px 0",
cursor:"pointer",
}}

onClick={()=>navigate("/resume")}

>

📄 Resume Analyzer

</div>

<div

style={{
padding:"14px 0",
cursor:"pointer",
}}

onClick={()=>navigate("/job-match")}

>

💼 Job Matcher

</div>

<div

style={{
padding:"14px 0",
cursor:"pointer",
}}

onClick={()=>navigate("/interview")}

>

🎤 Interview Coach

</div>

<div

style={{
padding:"14px 0",
cursor:"pointer",
}}

onClick={()=>navigate("/mock-interview")}

>

🤖 Mock Interview

</div>

<div

style={{
padding:"14px 0",
cursor:"pointer",
}}

onClick={()=>navigate("/assistant")}

>

🧠 AI Assistant

</div>

</div>

<div>

<button

onClick={toggleTheme}

style={{

width:"100%",

padding:"13px",

marginBottom:"15px",

border:"none",

borderRadius:"12px",

cursor:"pointer",

background:currentTheme.primary,

color:"white",

fontWeight:"600",

}}

>

{mode==="dark"

? "☀ Light Mode"

: "🌙 Dark Mode"}

</button>

<button

onClick={() => {

  localStorage.removeItem("token");

  navigate("/login");

}}

style={{

width:"100%",

padding:"13px",

border:"none",

borderRadius:"12px",

cursor:"pointer",

background:"#ef4444",

color:"white",

fontWeight:"600",

}}

>

Logout

</button>

</div>

</div>

{/* ===========================
        MAIN AREA
=========================== */}

<div

style={{

flex:1,

padding:"35px",

}}

>

{/* ===========================
        HERO SECTION
=========================== */}

<div

style={{

...cardStyle,

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px",

}}

>

<div

style={{

display:"flex",

alignItems:"center",

gap:"25px",

}}

>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  }}
>

  <img
    src={
      profileImage ||
      `https://ui-avatars.com/api/?name=${username}`
    }
    alt="profile"
    style={{
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      objectFit: "cover",
      border: `4px solid ${currentTheme.primary}`,
    }}
  />

  <button
    onClick={() => fileInputRef.current.click()}
    style={{
      border: "none",
      background: currentTheme.primary,
      color: "white",
      padding: "7px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "13px",
    }}
  >
    📷 Change Photo
  </button>

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleProfileChange}
    style={{ display: "none" }}
  />

</div>
<div>

<h1

style={{

margin:0,

fontSize:"34px",

}}

>

Welcome back,

<span

style={{

color:currentTheme.primary,

}}

>

{" "}

{username}

</span>

👋

</h1>

<p

style={{

marginTop:"8px",

color:currentTheme.subText,

}}

>

{email}

</p>

<p

style={{

marginTop:"10px",

color:"#22c55e",

fontWeight:"600",

}}

>

● Premium User

</p>

</div>

</div>

<div

style={{

textAlign:"right",

}}

>

<h3>

Today's Goal

</h3>

<p

style={{

color:currentTheme.subText,

marginBottom:"18px",

}}

>

Improve Resume &

Practice Interview

</p>

<button

onClick={()=>navigate("/resume")}

style={{

padding:"14px 28px",

border:"none",

borderRadius:"12px",

cursor:"pointer",

background:currentTheme.primary,

color:"white",

fontWeight:"600",

}}

>

Continue Journey →

</button>

</div>

</div>
{/* ===========================
        DASHBOARD OVERVIEW
=========================== */}

<h2
  style={{
    marginBottom: "20px",
  }}
>
  Dashboard Overview
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "20px",
    marginBottom: "35px",
  }}
>

  {/* Resume */}

  <div style={cardStyle}>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      📄 Resume Score
    </p>

    <h1
      style={{
        color:
          resumeScore >= 80
            ? "#22c55e"
            : resumeScore >= 60
            ? "#f59e0b"
            : "#ef4444",
        margin: "15px 0",
        fontSize: "42px",
      }}
    >
      {resumeScore}%
    </h1>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      ATS Performance
    </p>

  </div>

  {/* Job */}

  <div style={cardStyle}>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      💼 Job Matches
    </p>

    <h1
      style={{
        color: "#3b82f6",
        margin: "15px 0",
        fontSize: "42px",
      }}
    >
      {jobMatchScore}%
    </h1>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      Matching Jobs
    </p>

  </div>

  {/* Interview */}

  <div style={cardStyle}>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      🎤 Interview Score
    </p>

    <h1
      style={{
        color: "#7c3aed",
        margin: "15px 0",
        fontSize: "42px",
      }}
    >
      {interviewScore}%
    </h1>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      Performance
    </p>

  </div>

  {/* Mock */}

  <div style={cardStyle}>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      🤖 Mock Interviews
    </p>

    <h1
      style={{
        color: "#06b6d4",
        margin: "15px 0",
        fontSize: "42px",
      }}
    >
      {totalInterviews}
    </h1>

    <p
      style={{
        color: currentTheme.subText,
      }}
    >
      Completed
    </p>

  </div>

</div>

{/* ===========================
        AI ASSISTANT
=========================== */}

<div
  style={{
    ...cardStyle,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
  }}
>

  <div>

    <h2
      style={{
        marginBottom: "12px",
      }}
    >
      🤖 AI Career Assistant
    </h2>

    <p
      style={{
        color: currentTheme.subText,
        maxWidth: "550px",
        lineHeight: "1.8",
      }}
    >
      Ask career questions, improve your resume,
      prepare for interviews, generate roadmaps,
      explore job opportunities and receive
      personalized AI guidance.
    </p>

  </div>

  <button
    onClick={() => navigate("/assistant")}
    style={{
      padding: "16px 32px",
      border: "none",
      borderRadius: "14px",
      cursor: "pointer",
      background: "#22c55e",
      color: "white",
      fontWeight: "700",
      fontSize: "16px",
    }}
  >
    🚀 Start Chat
  </button>

</div>
{/* ===========================
        AI CAREER TOOLS
=========================== */}

<h2
  style={{
    marginBottom: "20px",
  }}
>
  🚀 AI Career Tools
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "22px",
    marginBottom: "35px",
  }}
>

  {/* Resume */}

  <div
    onClick={() => navigate("/resume")}
    style={{
      ...cardStyle,
      cursor: "pointer",
    }}
  >
    <h2>📄 Resume Analyzer</h2>

    <p
      style={{
        color: currentTheme.subText,
        lineHeight: "1.8",
      }}
    >
      Analyze your resume with AI,
      calculate ATS score,
      discover missing skills,
      receive professional suggestions,
      and download a detailed report.
    </p>

    <p
      style={{
        marginTop: "20px",
        color: currentTheme.primary,
        fontWeight: "700",
      }}
    >
      Open Tool →
    </p>

  </div>

  {/* Job Matcher */}

  <div
    onClick={() => navigate("/job-match")}
    style={{
      ...cardStyle,
      cursor: "pointer",
    }}
  >

    <h2>💼 Job Matcher</h2>

    <p
      style={{
        color: currentTheme.subText,
        lineHeight: "1.8",
      }}
    >
      Compare your resume with any job description,
      calculate compatibility,
      identify missing skills,
      and improve your chances of selection.
    </p>

    <p
      style={{
        marginTop: "20px",
        color: currentTheme.primary,
        fontWeight: "700",
      }}
    >
      Open Tool →
    </p>

  </div>

  {/* Interview */}

  <div
    onClick={() => navigate("/interview")}
    style={{
      ...cardStyle,
      cursor: "pointer",
    }}
  >

    <h2>🎤 Interview Coach</h2>

    <p
      style={{
        color: currentTheme.subText,
        lineHeight: "1.8",
      }}
    >
      Practice HR and technical interview questions,
      receive AI evaluation,
      improve confidence,
      and prepare for real interviews.
    </p>

    <p
      style={{
        marginTop: "20px",
        color: currentTheme.primary,
        fontWeight: "700",
      }}
    >
      Open Tool →
    </p>

  </div>

  {/* Mock */}

  <div
    onClick={() => navigate("/mock-interview")}
    style={{
      ...cardStyle,
      cursor: "pointer",
    }}
  >

    <h2>🤖 AI Mock Interview</h2>

    <p
      style={{
        color: currentTheme.subText,
        lineHeight: "1.8",
      }}
    >
      Experience a real AI interview,
      answer questions using voice,
      receive instant feedback,
      and track your interview progress.
    </p>

    <p
      style={{
        marginTop: "20px",
        color: currentTheme.primary,
        fontWeight: "700",
      }}
    >
      Open Tool →
    </p>

  </div>

</div>
{/* ===========================
        INSIGHTS & ACTIVITY
=========================== */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
    marginBottom: "35px",
  }}
>

  {/* Career Insight */}

  <div style={cardStyle}>

    <h2
      style={{
        marginBottom: "18px",
      }}
    >
      💡 Career Insight
    </h2>

    <p
      style={{
        color: currentTheme.subText,
        lineHeight: "2",
      }}
    >
      Recruiters usually spend
      <strong> 6–10 seconds </strong>
      scanning a resume.

      <br /><br />

      Keep your resume updated with

      ✔ Projects

      <br />

      ✔ Internships

      <br />

      ✔ Certifications

      <br />

      ✔ Technical Skills

      <br />

      ✔ Achievements

      <br /><br />

      A well-structured resume can
      significantly improve your chances
      of getting shortlisted.
    </p>

  </div>

  {/* Trending Skills */}

  <div style={cardStyle}>

    <h2
      style={{
        marginBottom: "20px",
      }}
    >
      🔥 Trending Skills
    </h2>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >

      {[
        "React",
        "Python",
        "FastAPI",
        "MongoDB",
        "AI",
        "Machine Learning",
        "Data Analytics",
        "Cloud",
      ].map((skill) => (

        <div
          key={skill}
          style={{
            background: currentTheme.primary,
            color: "white",
            padding: "10px 18px",
            borderRadius: "30px",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {skill}
        </div>

      ))}

    </div>

  </div>

</div>

{/* ===========================
        RECENT ACTIVITY
=========================== */}
{/* ===========================
        RECENT ACTIVITY
=========================== */}

<div
  style={{
    ...cardStyle,
    marginBottom: "35px",
  }}
>

  <h2
    style={{
      marginBottom: "20px",
      color: currentTheme.text,
    }}
  >
    📈 Recent Activity
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "18px",
    }}
  >

    <div>

      <p
        style={{
          marginBottom: "15px",
          color: currentTheme.text,
        }}
      >
        ✅ Resume analyzed successfully
      </p>

      <p
        style={{
          marginBottom: "15px",
          color: currentTheme.text,
        }}
      >
        💼 Job matching completed
      </p>

    </div>

    <div>

      <p
        style={{
          marginBottom: "15px",
          color: currentTheme.text,
        }}
      >
        🎤 Interview practice completed
      </p>

      <p
        style={{
          marginBottom: "15px",
          color: currentTheme.text,
        }}
      >
        🤖 AI Assistant ready
      </p>

    </div>

  </div>

</div>
{/* ===========================
        FOOTER
=========================== */}

<div
  style={{
    ...cardStyle,
    textAlign: "center",
    marginTop: "10px",
  }}
>

  <h2
    style={{
      color: currentTheme.primary,
      marginBottom: "10px",
    }}
  >
    🚀 AI Career Companion
  </h2>

  <p
    style={{
      color: currentTheme.subText,
      fontSize: "16px",
      lineHeight: "1.8",
    }}
  >
    AI-powered Resume Analysis • Smart Job Matching •
    Interview Coach • AI Mock Interview •
    Career Assistant
  </p>

  <hr
    style={{
      margin: "22px 0",
      borderColor: currentTheme.border,
    }}
  />

  <p
    style={{
      color: currentTheme.subText,
      fontSize: "15px",
    }}
  >
    Developed with ❤️ by
    <strong
      style={{
        color: currentTheme.primary,
      }}
    >
      {" "}
      Sneha Sharma
    </strong>
  </p>

  <p
    style={{
      color: currentTheme.subText,
      marginTop: "12px",
      fontSize: "13px",
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