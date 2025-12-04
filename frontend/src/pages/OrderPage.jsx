import React, { useState } from "react";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";
import OrderUpdateForm from "../components/OrderUpdateForm";
import OrderDetail from "../components/OrderDetail";

function OrderPage() {
    const [showForm, setShowForm] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleAddOrder = () => {
        setShowForm(true);
        setSelectedOrder(null);
        setShowUpdate(false);
    };

    const handleViewDetail = (order) => {
        setSelectedOrder(order);
        setShowForm(false);
        setShowUpdate(false);
    };

    const handleEditOrder = () => {
        setShowUpdate(true);
    };

    return (
        <div>
            <h3>Orders</h3>
            <button onClick={handleAddOrder}>+ Thêm đơn hàng</button>

            <OrderList onViewDetail={handleViewDetail} />

            {showForm && <OrderForm />}
            {selectedOrder && !showUpdate && (
                <OrderDetail order={selectedOrder} onEdit={handleEditOrder} />
            )}
            {showUpdate && selectedOrder && (
                <OrderUpdateForm order={selectedOrder} />
            )}
        </div>
    );
}

export default OrderPage;
