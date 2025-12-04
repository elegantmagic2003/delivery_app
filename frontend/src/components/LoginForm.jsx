import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(username, password);
            if (token) {
                onLogin(token);
                setError("");
                navigate("/"); // chuyển sang Dashboard
            } else {
                setError("Sai tài khoản hoặc mật khẩu!");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Đăng nhập thất bại, vui lòng thử lại.");
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập hệ thống</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
}

export default LoginForm;
