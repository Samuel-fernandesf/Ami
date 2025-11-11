import React, { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ onAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((v) => !v);

  const menuItems = [
    { name: "Perfil", icon: <FaUser />, action: () => onAction("userprofile") },
    { name: "Configurações", icon: <FaCog />, action: () => onAction("settings") },
    { name: "Sair", icon: <FaSignOutAlt />, action: () => onAction("logout") },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="menu-item"
            onClick={item.action}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && item.action()}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}