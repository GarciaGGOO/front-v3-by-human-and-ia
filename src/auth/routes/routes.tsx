import { Navigate } from "react-router-dom";
import { Login } from "../pages/Login";

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
