import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
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
          <p className="eyebrow">Admin-only protected route</p>
          <h1>Administration</h1>
          <p>Only accounts with the admin role can open this page.</p>
        </div>

        <div className="page-grid">
          <article className="panel">
            <h2>User management</h2>
            <p className="muted">
              Create users, assign roles and review account access.
            </p>

            <button className="primary-button" type="button">
              Manage users
            </button>
          </article>

          <article className="panel">
            <h2>Security settings</h2>
            <p className="muted">
              Configure permissions and authentication policies.
            </p>

            <button className="secondary-button" type="button">
              Open settings
            </button>
          </article>
        </div>

        <Link className="back-link" to="/dashboard">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
