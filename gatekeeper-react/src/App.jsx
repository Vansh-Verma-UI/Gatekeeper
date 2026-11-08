
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/register.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";

import "./styles/style.css";

function Unauthorized() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>403 - Access Denied</h2>
        <p className="muted">
          You don't have permission to access this page.
        </p>
        <a href="/" className="back-link">
          Back to Login
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute allowedRoles={["user", "manager", "admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["manager", "admin"]} />}>
            <Route path="/manager" element={<Dashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
