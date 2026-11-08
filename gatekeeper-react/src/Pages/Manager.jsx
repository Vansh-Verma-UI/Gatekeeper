import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Manager() {
  const { user, logout } = useAuth();

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <Link className="logo" to="/dashboard">
          Gatekeeper
        </Link>

        <div className="user-menu">
          <span>
            {user.name} <b>{user.role}</b>
          </span>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <section className="content">
        <div className="hero">
          <p className="eyebrow">Manager protected route</p>
          <h1>Manager reports</h1>
          <p>This page is available to manager and admin accounts.</p>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <span>Monthly sales</span>
            <strong>Rs. 8,42,000</strong>
          </article>

          <article className="stat-card">
            <span>Active users</span>
            <strong>1,248</strong>
          </article>

          <article className="stat-card">
            <span>Open reports</span>
            <strong>18</strong>
          </article>
        </div>

        <Link className="back-link" to="/dashboard">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
