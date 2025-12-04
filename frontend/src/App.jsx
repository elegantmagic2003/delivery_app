import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import CustomerPage from "./pages/CustomerPage.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/orders" element={<OrderPage />} />
                        <Route path="/customers" element={<CustomerPage />} />
                        {/* nếu user gõ /login khi đã đăng nhập thì redirect về / */}
                        <Route path="/login" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
