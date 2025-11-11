import React from "react";
import "./FooterComponent.css";

export default function FooterComponent() {
  return (
    <footer className="footer">
      <section>
        <p>© {new Date().getFullYear()} Ami. Todos os direitos reservados.</p>
      </section>
    </footer>
  );
}