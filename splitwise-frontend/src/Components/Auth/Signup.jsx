import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "../../styles/signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/signup", { name, email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Signup successful.");
      navigate("/Expenses");
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
        <h2 className="heading">Signup</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

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
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </h5>

        <button onClick={handleSignup} className="button">
          Signup
        </button>
      </div>
    </div>
  );
}
