// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { pb } from "../../api/PocketBase";

export const ProtectedRoute = () => {
  if (!pb.authStore.isValid) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
