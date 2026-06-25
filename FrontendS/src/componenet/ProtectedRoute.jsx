import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const email = localStorage.getItem("user-email");

  if (!email) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default ProtectedRoute;