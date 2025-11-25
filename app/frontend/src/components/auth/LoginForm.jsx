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

    try {
      const res = await login(email, senha);
      setLoading(false);

      if (res.ok) {
        login(data.token);
        navigate("/dashboard");
      } else {
        setError(res.error || "Erro ao autenticar");
        if (res.status === 404 || /não encontrado|nenhum usuário/i.test(res.error || "")) {
          if (window.confirm("Usuário não encontrado. Deseja criar uma conta?")) {
            switchTo("register");
          }
        }
      }
    } catch (err) {
      setLoading(false);
      setError("Erro de rede ao autenticar");
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
        <button type="submit" class="btn-primary" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}