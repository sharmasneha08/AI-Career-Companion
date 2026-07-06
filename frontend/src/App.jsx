import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ResumeAnalyzer from "./ResumeAnalyzer";
import JobMatch from "./JobMatch";
import InterviewCoach from "./InterviewCoach";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          token ? <Dashboard /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/resume"
        element={
          token ? <ResumeAnalyzer /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/job-match"
        element={
          token ? <JobMatch /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/interview"
        element={
          token ? <InterviewCoach /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;