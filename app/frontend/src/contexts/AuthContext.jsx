// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("userData");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Nunca armazene senha aqui. Se já tiver, remova:
      if (parsed && parsed.senha) delete parsed.senha;
      return parsed;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) localStorage.setItem("authToken", token);
    else localStorage.removeItem("authToken");
  }, [token]);

  useEffect(() => {
    if (user) {
      const u = { ...user };
      if (u.senha) delete u.senha; // segurança: nunca salvar senha
      localStorage.setItem("userData", JSON.stringify(u));
    } else {
      localStorage.removeItem("userData");
    }
  }, [user]);

  // Autenticação baseada em token é mais confiável
  const isAuthenticated = Boolean(token);

  // authFetch melhora o tratamento de erros e logout em 401
  const authFetch = useCallback(async (url, opts = {}) => {
    const headers = opts.headers ? { ...opts.headers } : {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (!headers["Content-Type"] && !(opts.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    try {
      const res = await fetch(url, { ...opts, headers });
      if (res.status === 401) {
        // token expirou ou inválido -> logout automático
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        // opcional: redirecionar
        navigate("/", { replace: true });
        return { ok: false, status: 401, error: "Não autorizado" };
      }

      // tenta parse seguro
      let json = null;
      try {
        json = await res.json();
      } catch (e) {
        // resposta sem JSON
      }

      if (!res.ok) {
        return { ok: false, status: res.status, error: json?.error || json || "Erro na requisição" };
      }

      return { ok: true, status: res.status, data: json };
    } catch (err) {
      return { ok: false, status: 0, error: err.message || "Erro de rede" };
    }
  }, [token, navigate]);

  const login = async (email, senha) => {
    setLoading(true);
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        const body = await res.json();
        if (body.token) setToken(body.token);
        if (body.user) {
          const u = { ...body.user };
          if (u.senha) delete u.senha;
          setUser(u);
        }
        setLoading(false);
        return { ok: true, user: body.user || null, token: body.token || null };
      }

      // Se falhou, tenta parse seguro da resposta
      const errBody = await res.json().catch(() => ({}));
      setLoading(false);
      return { ok: false, error: errBody.error || "Falha ao autenticar" };
    } catch (err) {
      setLoading(false);
      return { ok: false, error: "Erro de rede ao autenticar" };
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      // Evite enviar photo base64 diretamente quando for grande — ver sugestões abaixo.
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (res.status === 201 || res.ok) {
        // tenta login automático se a API fornece endpoint
        const email = payload.email;
        const senha = payload.senha;
        if (email && senha) {
          const loginResult = await login(email, senha);
          if (loginResult.ok) {
            setLoading(false);
            return { ok: true, user: loginResult.user };
          }
        }

        // Caso não faça login automático, guardamos apenas os dados públicos do user
        if (body) {
          const u = { ...body };
          if (u.senha) delete u.senha;
          setUser(u);
        }
        setLoading(false);
        return { ok: true, user: body || null };
      } else {
        setLoading(false);
        return { ok: false, error: body?.error || "Erro ao cadastrar" };
      }
    } catch (err) {
      setLoading(false);
      return { ok: false, error: "Erro de rede ao cadastrar" };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/", { replace: true });
  };

  const value = {
    token,
    user,
    setUser,
    setToken,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}