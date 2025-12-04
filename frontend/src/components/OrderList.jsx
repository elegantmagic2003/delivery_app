import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../api/orderApi";
import "./OrderList.css";

function OrderList({ onViewDetail }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getOrders();
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            setOrders((prev) => prev.filter((o) => o.id !== id));
        } catch (err) {
            console.error("Lỗi khi xóa đơn hàng:", err);
        }
    };

    return (
        <div className="order-list">
            <h3>Danh sách đơn hàng</h3>
            {loading ? (
                <p>Đang tải...</p>
            ) : orders.length === 0 ? (
                <p>Chưa có đơn hàng nào</p>
            ) : (
                <ul>
                    {orders.map((o) => (
                        <li key={o.id}>
                            <strong>Order #{o.id}</strong> | Customer: {o.customerId}
                            <div className="order-actions">
                                <button onClick={() => onViewDetail(o)}>Xem chi tiết</button>
                                <button onClick={() => handleDelete(o.id)}>Xóa</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderList;
