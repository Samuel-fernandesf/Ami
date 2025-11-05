import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthContext: provê auth state (user, token), actions: login, register, logout.
 * Persiste token/user em localStorage.
 */

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // init from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("userData")) || null;
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
    if (user) localStorage.setItem("userData", JSON.stringify(user));
    else localStorage.removeItem("userData");
  }, [user]);

  const isAuthenticated = !!token || !!user; // for local fallback

  // helper for authenticated fetch
  const authFetch = async (url, opts = {}) => {
    const headers = opts.headers ? { ...opts.headers } : {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    const res = await fetch(url, { ...opts, headers });
    return res;
  };

  // LOGIN: tenta backend /auth/login, senão fallback localStorage
  const login = async (email, senha) => {
    setLoading(true);
    try {
      // tenta endpoint do backend
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (res.ok) {
        const body = await res.json();
        if (body.token) setToken(body.token);
        if (body.user) setUser(body.user);
        setLoading(false);
        return { ok: true, user: body.user || null };
      }

      // se backend não existir / falhar (404/500), tenta fallback local (apenas para dev)
      // fallback: compara com userData salvo localmente (útil para testes sem backend)
      const stored = JSON.parse(localStorage.getItem("userData") || "null");
      if (stored && stored.email === email && stored.senha === senha) {
        // cria token local (dummy)
        const fakeToken = "local-dev-token";
        setToken(fakeToken);
        setUser(stored);
        setLoading(false);
        return { ok: true, user: stored };
      }

      // autenticação falhou
      const errBody = await res.json().catch(() => ({}));
      setLoading(false);
      return { ok: false, error: errBody.error || "Falha ao autenticar" };
    } catch (err) {
      // rede/endpoint indisponível -> fallback local
      try {
        const stored = JSON.parse(localStorage.getItem("userData") || "null");
        if (stored && stored.email === email && stored.senha === senha) {
          const fakeToken = "local-dev-token";
          setToken(fakeToken);
          setUser(stored);
          setLoading(false);
          return { ok: true, user: stored };
        }
      } catch {}
      setLoading(false);
      return { ok: false, error: "Erro de rede ao autenticar" };
    }
  };

  // REGISTER: chama POST /users. Se backend retornar 201, tenta login automático.
  const register = async (payload) => {
    setLoading(true);
    try {
      // envia JSON para /users (conforme sua rota Flask)
      const res = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (res.status === 201) {
        // registro OK. tenta login automático via endpoint /auth/login
        // se não houver, armazena o user retornado e retorna sucesso.
        const email = payload.email;
        const senha = payload.senha;

        // Tenta login via endpoint
        const loginResult = await login(email, senha);
        if (loginResult.ok) {
          setLoading(false);
          return { ok: true, user: loginResult.user || body };
        } else {
          // login automático não funcionou (ex: /auth/login não existe) -> salva user retornado
          if (body) {
            setUser(body);
            // não há token -> token permanece null (ou pode criar local token)
          }
          setLoading(false);
          return { ok: true, user: body };
        }
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
    // opcional: limpar localStorage keys
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    // redirecionar para home
    navigate("/");
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