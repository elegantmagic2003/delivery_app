import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder } from "../api/orderApi";

function OrderList({ token }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders(token)
            .then((data) => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]); // fallback nếu API trả về object lỗi
                }
            })
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, [token]);

    const handleDelete = async (id) => {
        await deleteOrder(token, id);
        setOrders((prev) => prev.filter((o) => o.id !== id));
    };

    return (
        <div>
            <h3>Danh sách đơn hàng</h3>
            {loading ? (
                <p>Đang tải...</p>
            ) : orders.length === 0 ? (
                <p>Chưa có đơn hàng nào</p>
            ) : (
                <ul>
                    {orders.map((o) => (
                        <li key={o.id}>
                            <strong>Order #{o.id}</strong> | Customer: {o.customerId} | Status:{" "}
                            {o.status} | Created: {o.createdAt}
                            <ul>
                                {Array.isArray(o.items) &&
                                    o.items.map((item) => (
                                        <li key={item.id}>
                                            Product: {item.productId} | Quantity: {item.quantity}
                                        </li>
                                    ))}
                            </ul>
                            <button onClick={() => handleDelete(o.id)}>Xóa</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OrderList;
