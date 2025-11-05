import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Modal.css";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // "login" | "register" | null

  // Sincroniza modal com a rota
  useEffect(() => {
    if (location.pathname === "/login") setModalType("login");
    else if (location.pathname === "/register") setModalType("register");
    else setModalType(null);
  }, [location.pathname]);

  function open(type) {
    setModalType(type);
    navigate("/" + type);
  }

  function close() {
    setModalType(null);
    // volta para home (ou qualquer rota base)
    navigate("/", { replace: true });
  }

  function switchTo(type) {
    setModalType(type);
    navigate("/" + type, { replace: false });
  }

  return (
    <ModalContext.Provider value={{ modalType, open, close, switchTo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

/* Componente Modal que mostra um toggle interno para alternar entre os formulários. */
export default function Modal() {
  const { modalType, close, switchTo } = useModal();
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    // foco no primeiro input quando modal abre
    firstInputRef.current?.focus();
    // bloqueia scroll do body
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [modalType]);

  if (!modalType) return null;

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) close();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") close();
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={onOverlayClick}
      onKeyDown={onKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-card" role="document">
        <div className="modal-head">
          <div className="modal-toggle">
            <button
              className={`toggle-btn ${modalType === "register" ? "active" : ""}`}
              onClick={() => switchTo("register")}
              aria-pressed={modalType === "register"}
            >
              Criar conta
            </button>
            <button
              className={`toggle-btn ${modalType === "login" ? "active" : ""}`}
              onClick={() => switchTo("login")}
              aria-pressed={modalType === "login"}
            >
              Entrar
            </button>
          </div>
          <button className="modal-close" onClick={close} aria-label="Fechar modal">×</button>
        </div>

        <div className="modal-body">
          {modalType === "register" ? (
            <RegisterForm firstInputRef={firstInputRef} />
          ) : (
            <LoginForm firstInputRef={firstInputRef} />
          )}
        </div>
      </div>
    </div>
  );
}