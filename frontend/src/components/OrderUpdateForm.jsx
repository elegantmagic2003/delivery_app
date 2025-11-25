import React, { useState } from "react";
import { updateOrder } from "../api/orderApi";

function OrderUpdateForm({ token }) {
    const [orderId, setOrderId] = useState("");
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
        const dto = {
            customerId: parseInt(customerId),
            status,
            items: items.map((it, idx) => ({
                id: idx + 1, // tạm gán id cho item
                productId: parseInt(it.productId),
                quantity: parseInt(it.quantity)
            }))
        };
        await updateOrder(token, orderId, dto);
        alert("Cập nhật đơn hàng thành công!");
        setOrderId("");
        setCustomerId("");
        setStatus("NEW");
        setItems([{ productId: "", quantity: "" }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
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

            <button type="submit">Cập nhật đơn hàng</button>
        </form>
    );
}

export default OrderUpdateForm;
