import React, { useState } from "react";
import { useModal } from "../modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import "./AuthForm.css";

export default function LoginForm({ firstInputRef }) {
  const { close, switchTo } = useModal();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(email, senha);
    setLoading(false);

    if (res.ok) {
      alert(`Bem-vindo, ${res.user?.nome_completo || res.user?.email || "usuário"}!`);
      close();
    } else {
      setError(res.error || "Erro ao autenticar");
      // Sugestão para criar conta quando user não existe
      if (res.error && /não encontrado|nenhum usuário/i.test(res.error)) {
        if (window.confirm("Usuário não encontrado. Deseja criar uma conta?")) {
          switchTo("register");
        }
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form" noValidate>
      <h2>Entrar</h2>

      <label>Email:</label>
      <input
        ref={firstInputRef}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Senha:</label>
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      {error && <small className="error">{error}</small>}

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <button
          type="button"
          onClick={() => switchTo("register")}
          style={{ marginLeft: 8 }}
        >
          Criar conta
        </button>
      </div>
    </form>
  );
}