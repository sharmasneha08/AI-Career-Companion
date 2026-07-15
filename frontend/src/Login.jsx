import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      let response;

      if (type === "register") {
        response = await axios.post(
          "http://127.0.0.1:8000/register",
          {
            name,
            email,
            password,
          }
        );

        toast.success(response.data.message);

        setType("login");
        setName("");
        setEmail("");
        setPassword("");
      } else {
       response = await axios.post(
  "http://127.0.0.1:8000/login",
          {
            name: "",
            email,
            password,
          }
        );

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.name || "");
        localStorage.setItem("email", email);

        toast.success(`Welcome ${response.data.name} 🎉`);

        navigate("/dashboard");
      }
    }
    catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    toast.error(error.response.data.detail);
    console.log("Response:", error.response);
  } else if (error.request) {
    toast.error("Cannot connect to backend");
    console.log("Request:", error.request);
  } else {
    toast.error(error.message);
    console.log(error.message);
  }
}
};

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          🤖
        </div>

        <h1 className="login-title">
          AI Career Companion
        </h1>

        <p className="login-subtitle">
          {type === "login"
            ? "Welcome back! Login to continue your AI career journey."
            : "Create your account to get started."}
        </p>

        <div className="login-form">
                    {type === "register" && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="primary-btn"
            onClick={submit}
          >
            {type === "login"
              ? "Login"
              : "Create Account"}
          </button>

          <p className="switch-text">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            className="switch-btn"
            onClick={() =>
              setType(
                type === "login"
                  ? "register"
                  : "login"
              )
            }
          >
            {type === "login"
              ? "Create New Account"
              : "Back to Login"}
          </button>
                  </div>

      </div>
    </div>
  );
}

export default Login;