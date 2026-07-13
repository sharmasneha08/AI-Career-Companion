import { Routes, Route, Navigate } from "react-router-dom";
import CareerAssistant from "./CareerAssistant";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ResumeAnalyzer from "./ResumeAnalyzer";
import JobMatch from "./JobMatch";
import InterviewCoach from "./InterviewCoach";
import MockInterview from "./MockInterview";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          token ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/resume"
        element={
          token ? (
            <ResumeAnalyzer />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
            <Route
        path="/job-match"
        element={
          token ? (
            <JobMatch />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/interview"
        element={
          token ? (
            <InterviewCoach />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/mock-interview"
        element={
          token ? (
            <MockInterview />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
<Route
  path="/assistant"
  element={<CareerAssistant />}
/>
    </Routes>
  );
}

export default App;