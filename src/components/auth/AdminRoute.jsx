import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


//valida admin route
export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.Profile?.Nombre !== "admin") {
  //  return <Navigate to={`/profile/${user.Id}`} replace />;
  return <Navigate to="/home" replace />;
  }

  return children;
}
