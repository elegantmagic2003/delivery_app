import api from "./axiosInstance";

export async function getOrders() {
    const res = await api.get("/orders");
    return res.data;
}

export async function getOrderById(id) {
    const res = await api.get(`/orders/${id}`);
    return res.data;
}

export async function createOrder(orderRequest) {
    const res = await api.post("/orders/new", orderRequest);
    return res.data;
}

export async function updateOrder(id, orderRequest) {
    const res = await api.put(`/orders/${id}`, orderRequest);
    return res.data;
}

export async function deleteOrder(id) {
    await api.delete(`/orders/${id}`);
}

export async function getOrdersByCustomer(customerId) {
    const res = await api.get(`/orders/customer/${customerId}`);
    return res.data;
}
