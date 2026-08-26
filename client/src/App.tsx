import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// Динамические импорты для админских компонентов
const AdminMainPage = React.lazy(() => import("./pages/admin/AdminMainPage"));
const ProtectedRoute = React.lazy(() =>
  import("./pages/admin/ProtectedRoute").then((module) => ({
    default: module.ProtectedRoute,
  })),
);
const Login = React.lazy(() => import("./pages/admin/Login"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              Загрузка...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminMainPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
