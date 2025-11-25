import React, { useState } from "react";
import { getCustomerById } from "../api/customerApi";
import { getOrdersByCustomer } from "../api/orderApi";

function CustomerDetail({ token }) {
    const [customerId, setCustomerId] = useState("");
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cust = await getCustomerById(token, customerId);
        setCustomer(cust);
        const ords = await getOrdersByCustomer(token, customerId);
        setOrders(ords);
    };

    return (
        <div>
            <h3>Xem chi tiết khách hàng</h3>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />
                <button type="submit">Xem</button>
            </form>

            {customer && (
                <div style={{ marginTop: "20px" }}>
                    <h4>{customer.name}</h4>
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone}</p>
                    <p>Address: {customer.address}</p>

                    <h5>Đơn hàng của khách này:</h5>
                    <ul>
                        {orders.map((o) => (
                            <li key={o.id}>
                                Order #{o.id} | Status: {o.status} | Created: {o.createdAt}
                                <ul>
                                    {o.items.map(item => (
                                        <li key={item.id}>
                                            Product: {item.productId} | Quantity: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CustomerDetail;
