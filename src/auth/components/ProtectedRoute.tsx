import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/contexts/AuthContext";

export function ProtectedRoute() {
  const { user } = useAuth();

  console.log("User no ProtectedRoute:", user);


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
