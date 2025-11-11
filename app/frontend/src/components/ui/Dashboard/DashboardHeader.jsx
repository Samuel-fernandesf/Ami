import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css";

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="dashboard-header">
      <h1 className="logo">Ami</h1>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/userprofile")}>Perfil</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}