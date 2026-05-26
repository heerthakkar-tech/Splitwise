import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      alert("Login successful.");
      navigate("/expenses");
    } catch (err) {
      alert(
        err.response?.data?.error || err.response?.data?.message || "Error",
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Splitwise App</h1>
      <div className="container">
        <h2 className="heading">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <h5>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="login-link">
            Signup
          </Link>
        </h5>

        <button onClick={handleLogin} className="button">
          Login
        </button>
      </div>
    </div>
  );
}
