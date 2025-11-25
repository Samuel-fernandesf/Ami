// src/components/modal/Modal.jsx
// Modal refeito do zero — focado em alinhamento, acessibilidade, foco e compatibilidade
// com os formulários LoginForm / RegisterForm (que recebem firstInputRef).

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Modal.css";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const ModalContext = createContext();

/**
 * ModalProvider:
 * Mantém o estado do modal (login/register/null) e sincroniza com a rota.
 * Exporta open/close/switchTo para serem usados em outros componentes.
 */
export function ModalProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // "login" | "register" | null

  // Sincroniza modal com rota (ex: /login, /register)
  useEffect(() => {
    if (location.pathname === "/login") setModalType("login");
    else if (location.pathname === "/register") setModalType("register");
    else setModalType(null);
  }, [location.pathname]);

  const open = (type) => {
    setModalType(type);
    navigate("/" + type);
  };

  const close = () => {
    setModalType(null);
    // volta para rota base sem empilhar histórico
    navigate("/", { replace: true });
  };

  const switchTo = (type) => {
    setModalType(type);
    navigate("/" + type, { replace: false });
  };

  return (
    <ModalContext.Provider value={{ modalType, open, close, switchTo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

/* ==================================================================================
   Componente Modal (visível quando modalType é 'login' ou 'register')
   - foco inicial no primeiro input do form (firstInputRef)
   - trap de foco simples
   - fecha com ESC, clique no overlay ou botão fechar
   - toggle centralizado, botões do mesmo tamanho, alinhamento perfeito
   ================================================================================== */

export default function Modal() {
  const { modalType, close, switchTo } = useModal();
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  // ref encaminhada para o primeiro input dos formulários
  const firstInputRef = useRef(null);

  // foco no primeiro input e bloqueio do scroll de body quando modal abre
  useEffect(() => {
    if (!modalType) return;

    // bloquear scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // foco no primeiro input (com pequeno delay para garantir render)
    const t = setTimeout(() => {
      firstInputRef.current?.focus?.();
    }, 40);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalType]);

  // Fecha se clicar no overlay (fora do card)
  function onOverlayClick(e) {
    if (e.target === overlayRef.current) close();
  }

  // Fecha com ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") close();
      // trap básico de foco: se tab fora do dialog, volta pro começo
      if (e.key === "Tab" && modalType) {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    if (!modalType) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalType, close]);

  if (!modalType) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={onOverlayClick}
      aria-hidden={modalType ? "false" : "true"}
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()} // evita fechar ao clicar dentro do card
      >
        {/* cabeçalho: toggle e fechar */}
        <header className="modal-head">
          <div className="modal-toggle" role="tablist" aria-label="Escolha entre criar conta ou entrar">
            {/* toggle: botões com largura igual — mantém alinhamento */}
            <button
              className={`toggle-btn ${modalType === "register" ? "active" : ""}`}
              onClick={() => switchTo("register")}
              aria-pressed={modalType === "register"}
              aria-label="Criar conta"
            >
              Criar conta
            </button>

            <button
              className={`toggle-btn ${modalType === "login" ? "active" : ""}`}
              onClick={() => switchTo("login")}
              aria-pressed={modalType === "login"}
              aria-label="Entrar"
            >
              Entrar
            </button>
          </div>

          <button className="modal-close" onClick={close} aria-label="Fechar diálogo">
            ×
          </button>
        </header>

        {/* corpo do modal: form */}
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
