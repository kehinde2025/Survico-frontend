import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔒 Not logged in
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // 🧩 If your app supports roles (e.g., "admin", "user")
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role || "user")) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
}
