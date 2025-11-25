import React, { useState } from "react";
import { getOrderById } from "../api/orderApi";

function OrderDetail({ token }) {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await getOrderById(token, orderId);
        setOrder(data);
    };

    return (
        <div>
            <h3>Xem chi tiết đơn hàng</h3>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button type="submit">Xem</button>
            </form>

            {order && (
                <div style={{ marginTop: "20px" }}>
                    <h4>Order #{order.id}</h4>
                    <p>Customer ID: {order.customerId}</p>
                    <p>Status: {order.status}</p>
                    <p>Created At: {order.createdAt}</p>
                    <h5>Items:</h5>
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.id}>
                                Product: {item.productId} | Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;
