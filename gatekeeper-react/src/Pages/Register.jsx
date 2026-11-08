
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
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
        "http://localhost:5100/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed!");
        return;
      }

      setSuccess("Account created successfully! Redirecting to Sign In...");

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      setTimeout(() => {
        navigate("/");
      }, 1500);

} catch (error) {
  console.error("REGISTER API ERROR:", error);
  setError(error.message);
} finally {
  setLoading(false);
}
  }

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

        <h2>Create Account</h2>

        <p className="muted">
          Register to access Gatekeeper.
        </p>

        <form onSubmit={handleRegister}>

          <label htmlFor="registerName">Full Name</label>
          <input
            type="text"
            id="registerName"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="registerEmail">Email Address</label>
          <input
            type="email"
            id="registerEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="registerPassword">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="registerPassword"
            placeholder="Create password"
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

          <label htmlFor="registerRole">Select Role</label>

          <select
            id="registerRole"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>

          {error && (
            <div className="alert error">{error}</div>
          )}

          {success && (
            <div className="alert info">{success}</div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <a href="/">Sign In</a>
        </p>

      </div>
    </div>
  );
}

export default Register;
