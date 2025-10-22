// src/components/InspectorProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function InspectorProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "inspector") {
    return <Navigate to="/inspector/login" />;
  }

  return children;
}
