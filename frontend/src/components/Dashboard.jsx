import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // import file CSS riêng

function Dashboard({ onLogout }) {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h2>Quản lý hệ thống</h2>
                <button className="logout-btn" onClick={onLogout}>Đăng xuất</button>
            </header>

            <nav className="dashboard-nav">
                <ul>
                    <li><Link to="/products">📦 Products</Link></li>
                    <li><Link to="/orders">📝 Orders</Link></li>
                    <li><Link to="/customers">👤 Customers</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
