import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("loggedIn", "true");
    navigate("/live");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">Calmisense</div>
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">
          Follow your child's wellbeing and get alerts when something changes.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="login-input"
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="password">Password</label>
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit">Sign in</button>
        </form>

        <Link className="login-link forgot" to="/forgot-password">
          Forgot password?
        </Link>

        <hr className="login-divider" />

        <p className="login-footer">
          New caregiver?{" "}
          <Link className="login-link" to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}