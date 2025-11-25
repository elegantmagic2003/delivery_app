export async function getOrders(token) {
    const res = await fetch("http://localhost:8080/orders", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function createOrder(token, orderRequest) {
    const res = await fetch("http://localhost:8080/orders/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderRequest),
    });
    return res.json();
}

export async function updateOrder(token, id, orderRequest) {
    const res = await fetch(`http://localhost:8080/orders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderRequest),
    });
    return res.json();
}

export async function deleteOrder(token, id) {
    await fetch(`http://localhost:8080/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function getOrderById(token, id) {
    const res = await fetch(`http://localhost:8080/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function getOrdersByCustomer(token, customerId) {
    const res = await fetch(`http://localhost:8080/orders/customer/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}
