import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Server not running");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "470px",
          background: "#1f2937",
          padding: "40px",
          borderRadius: "22px",
          border: "1px solid #374151",
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "34px",
            marginBottom: "8px",
          }}
        >
          🚀 AI Career Companion
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginBottom: "35px",
            fontSize: "16px",
          }}
        >
          {type === "login"
            ? "Welcome Back! Login to continue."
            : "Create your AI Career account."}
        </p>

        {type === "register" && (
          <input
            type="text"
            placeholder="👤 Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
                <button
          onClick={submit}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "linear-gradient(135deg,#2563eb,#7c3aed)",
            color: "white",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {type === "login"
            ? "🚀 Login"
            : " ✨ Create Account"}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            marginTop: "25px",
            marginBottom: "15px",
          }}
        >
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </p>

        <button
          onClick={() =>
            setType(
              type === "login"
                ? "register"
                : "login"
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            border: "1px solid #475569",
            borderRadius: "12px",
            background: "#374151",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {type === "login"
            ? "Create New Account"
            : "Back to Login"}
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #374151",
  background: "#111827",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};
const primaryButton = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(135deg,#2563eb,#7c3aed)",
  color: "#fff",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all .3s ease",
  marginTop: "5px",
};

const secondaryButton = {
  width: "100%",
  padding: "15px",
  marginTop: "12px",
  border: "1px solid #475569",
  borderRadius: "12px",
  background: "#374151",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all .3s ease",
};

export default Login;