import React from "react";
import HeaderComponent from "../components/ui/HeaderComponent";
import FooterComponent from "../components/ui/FooterComponent";
import Modal, { useModal } from "../components/modal/Modal";

export default function MainLayout({ children }) {
  const { modalType } = useModal(); // assume hook retorna { modalType, open, close, ... }

  return (
    <div className="layout">
      <HeaderComponent />
      <main>{children}</main>
      <FooterComponent />

      {/* Modal global */}
      {modalType && <Modal type={modalType} />}
    </div>
  );
}