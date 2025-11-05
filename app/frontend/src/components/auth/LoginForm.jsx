import { useState } from 'react';
import "./AuthForm.css";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('userData'));

        if (!storedUser) {
            alert("Nenhum usuário cadastrado encontrado!");
            return;
        }

        if (email === storedUser.email && senha === storedUser.senha) {
            alert(`Bem-vindo, ${storedUser.nome_completo}!`);
            console.log("Login bem-sucedido:", storedUser);
        } else {
            alert("Email ou senha incorretos!");
        }
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>

            <label>Email:</label>
            <input
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

            <button type="submit">Entrar</button>
        </form>
    );
}