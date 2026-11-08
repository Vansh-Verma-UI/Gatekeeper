
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  const permissions = {
    user: [
      "GET /api/profile"
    ],

    manager: [
      "GET /api/profile",
      "GET /api/reports/sales"
    ],

    admin: [
      "GET /api/profile",
      "GET /api/reports/sales",
      "GET /api/users",
      "PATCH /api/users/:id/role",
      "DELETE /api/users/:id"
    ]
  };

  useEffect(() => {

    const fetchProfile = async () => {

      const token = sessionStorage.getItem("gatekeeperToken");

      if (!token) {
        logout();
        navigate("/", { replace: true });
        return;
      }

      try {

        const response = await fetch(
          "http://localhost:5100/api/protected/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {

          if (response.status === 401) {
            logout();
            navigate("/", { replace: true });
            return;
          }

          throw new Error(data.message || "Unable to fetch profile.");
        }

        setUser(data.user);

      } catch (err) {

        setError(err.message || "Something went wrong.");

      } finally {

        setLoading(false);

      }
    };

    fetchProfile();

  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="panel">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="panel">
          <h2>Unable to load profile</h2>
          <p>{error}</p>
          <button onClick={handleLogout}>Back to Login</button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userPermissions = permissions[user.role] || [];

  return (
    <div className="dashboard-page">

      {/* TOP NAVBAR */}

      <nav className="topbar">

        <a href="/" className="logo">
          Gatekeeper
        </a>

        <div className="user-menu">

          <span>
            Welcome, <strong>{user.name}</strong>
          </span>

          <b>{user.role}</b>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>

      {/* MAIN CONTENT */}

      <main className="content">

        <section className="hero">

          <p className="eyebrow">
            Authentication Dashboard
          </p>

          <h1>Welcome Back, {user.name}!</h1>

          <p>
            Manage your account and explore your authorized services.
          </p>

        </section>

        {/* USER STATS */}

        <section className="stats-grid">

          <div className="stat-card">
            <span>Account Status</span>
            <strong>Active</strong>
          </div>

          <div className="stat-card">
            <span>Current Role</span>
            <strong>{user.role}</strong>
          </div>

          <div className="stat-card">
            <span>Permissions</span>
            <strong>{userPermissions.length}</strong>
          </div>

        </section>

        {/* PROFILE AND SERVICES */}

        <section className="page-grid">

          <div className="panel">

            <h2>User Profile</h2>

            <dl className="profile-list">

              <div>
                <dt>Name</dt>
                <dd>{user.name}</dd>
              </div>

              <div>
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>

              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>

            </dl>

          </div>

          <div className="panel">

            <h2>Available Services</h2>

            <p className="muted">
              Services available according to your role.
            </p>

            <div className="route-buttons">

              {userPermissions.map((route) => (
                <a
                  href="#"
                  key={route}
                  onClick={(e) => e.preventDefault()}
                >
                  {route}
                </a>
              ))}

            </div>

          </div>

        </section>

        {/* ACCESS MATRIX */}

        <section className="panel matrix-panel">

          <h2>Access Matrix</h2>

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Route</th>
                  <th>User</th>
                  <th>Manager</th>
                  <th>Admin</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>/api/profile</td>
                  <td className="allowed">✓</td>
                  <td className="allowed">✓</td>
                  <td className="allowed">✓</td>
                </tr>

                <tr>
                  <td>/api/reports/sales</td>
                  <td className="denied">–</td>
                  <td className="allowed">✓</td>
                  <td className="allowed">✓</td>
                </tr>

                <tr>
                  <td>/api/users</td>
                  <td className="denied">–</td>
                  <td className="denied">–</td>
                  <td className="allowed">✓</td>
                </tr>

                <tr>
                  <td>/api/users/:id/role</td>
                  <td className="denied">–</td>
                  <td className="denied">–</td>
                  <td className="allowed">✓</td>
                </tr>

                <tr>
                  <td>/api/users/:id</td>
                  <td className="denied">–</td>
                  <td className="denied">–</td>
                  <td className="allowed">✓</td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
