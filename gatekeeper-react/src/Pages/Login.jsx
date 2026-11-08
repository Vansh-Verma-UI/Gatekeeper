
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5100/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed!");
        return;
      }

      // Save JWT Token
      sessionStorage.setItem(
        "gatekeeperToken",
        data.token
      );

      // Save User in AuthContext
      login(data.user);

      // Redirect according to role
      if (data.user.role === "admin") {
        navigate("/admin");
      } 
      else if (data.user.role === "manager") {
        navigate("/manager");
      } 
      else {
        navigate("/dashboard");
      }

    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="brand">
          <div className="brand-icon">G</div>

          <div>
            <h1>Gatekeeper</h1>
            <p>Secure Authentication System</p>
          </div>
        </div>

        <h2>Welcome Back</h2>

        <p className="muted">
          Sign in to access your account.
        </p>

        <form onSubmit={handleLogin}>

          <label htmlFor="loginEmail">
            Email Address
          </label>

          <input
            type="email"
            id="loginEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="loginPassword">
            Password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            id="loginPassword"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="secondary-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <a href="/register">Create Account</a>
        </p>

        <div className="demo-section">
          <p>Demo accounts:</p>

          <button type="button">Admin</button>
          <button type="button">Manager</button>
          <button type="button">User</button>
        </div>

      </div>

    </div>
  );
}

export default Login;
