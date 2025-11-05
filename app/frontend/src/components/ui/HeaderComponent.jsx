import { useModal } from "../modal/Modal";
import "./HeaderComponent.css";

export default function HeaderComponent() {
  const { open } = useModal();

  return (
    <header className="header">
      <h1 className="logo">Ami</h1>
      <nav>
        <ul>
          <li>
            <button onClick={() => open("register")}>Cadastrar-se</button>
          </li>
          <li>
            <button onClick={() => open("login")}>Entrar</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}