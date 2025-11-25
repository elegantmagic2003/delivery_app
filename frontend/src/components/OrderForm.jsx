import React, { useState } from "react";
import { createOrder } from "../api/orderApi";

function OrderForm({ token }) {
    const [customerId, setCustomerId] = useState("");
    const [status, setStatus] = useState("NEW");
    const [items, setItems] = useState([{ productId: "", quantity: "" }]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { productId: "", quantity: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderRequest = {
            customerId: parseInt(customerId),
            status,
            items: items.map((it, idx) => ({
                id: idx + 1, // tạm gán id cho DTO item
                productId: parseInt(it.productId),
                quantity: parseInt(it.quantity)
            }))
        };
        await createOrder(token, orderRequest);
        alert("Tạo đơn hàng thành công!");
        setCustomerId("");
        setStatus("NEW");
        setItems([{ productId: "", quantity: "" }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="NEW">NEW</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>

            <h4>Items</h4>
            {items.map((item, idx) => (
                <div key={idx}>
                    <input
                        placeholder="Product ID"
                        value={item.productId}
                        onChange={(e) => handleItemChange(idx, "productId", e.target.value)}
                    />
                    <input
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                    />
                </div>
            ))}
            <button type="button" onClick={addItem}>+ Thêm sản phẩm</button>

            <button type="submit">Tạo đơn hàng</button>
        </form>
    );
}

export default OrderForm;
