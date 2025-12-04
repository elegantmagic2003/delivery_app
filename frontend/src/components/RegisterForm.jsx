import React, { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // thêm state
    const [role, setRole] = useState("USER");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // kiểm tra mật khẩu nhập lại
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const result = await register(username, password, role);
            if (result) {
                setSuccess("Đăng ký thành công!");
                setError("");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setError("Đăng ký thất bại!");
            }
        } catch (err) {
            console.error("Register error:", err);
            setError("Đăng ký thất bại, vui lòng thử lại.");
        }
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="USER">USER</option>
                    <option value="STAFF">STAFF</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
        </div>
    );
}

export default RegisterForm;
