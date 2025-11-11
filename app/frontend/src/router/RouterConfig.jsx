import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import UserProfilePage from "../pages/UserProfilePage";
import { useAuth } from "../contexts/AuthContext";
import Modal from "../components/modal/Modal";

/* ---------- Rota protegida ---------- */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // redireciona à home com modal de login
    return <Navigate to="/login" replace />;
  }
  return children;
}

/* ---------- Rota pública restrita (para login/register) ---------- */
function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    // se já estiver logado, vai direto ao dashboard
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default function RouterConfig() {
  return (
    <>
      <Routes>
        {/* Página inicial (pública) */}
        <Route path="/" element={<HomePage />} />

        {/* Login e Registro — públicos mas bloqueados para logados */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <HomePage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <HomePage />
            </PublicOnlyRoute>
          }
        />

        {/* Dashboard — protegido */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Perfil — protegido */}
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modal global (login/register) */}
      <Modal />
    </>
  );
}