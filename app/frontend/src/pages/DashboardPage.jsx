import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/ui/Dashboard/DashboardHeader";
import Sidebar from "../components/ui/Dashboard/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import "./DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeSection, setActiveSection] = useState("home");

  const handleSidebarAction = (action) => {
    switch (action) {
      case "userprofile":
        navigate("/userprofile");
        break;
      case "settings":
        setActiveSection("settings");
        break;
      case "logout":
        logout();
        navigate("/");
        break;
      default:
        setActiveSection("home");
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardHeader />
      <Sidebar onAction={handleSidebarAction} />
      <main className="dashboard-content">
        {activeSection === "home" && (
          <>
            <h2>Bem-vindo ao Dashboard</h2>
            <p>Gerencie suas informações e acesse suas funcionalidades.</p>
          </>
        )}
        {activeSection === "settings" && (
          <>
            <h2>Configurações</h2>
            <p>Aqui você pode ajustar suas preferências e opções da conta.</p>
          </>
        )}
      </main>
    </div>
  );
}