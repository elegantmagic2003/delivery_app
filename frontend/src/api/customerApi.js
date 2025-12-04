import api from "./axiosInstance";

export async function getCustomers() {
    const res = await api.get("/customers");
    return res.data;
}

export async function getCustomerById(id) {
    const res = await api.get(`/customers/${id}`);
    return res.data;
}

export async function createCustomer(customer) {
    const res = await api.post("/customers/new", customer);
    return res.data;
}

export async function updateCustomer(id, customer) {
    const res = await api.put(`/customers/${id}`, customer);
    return res.data;
}

export async function deleteCustomer(id) {
    await api.delete(`/customers/${id}`);
}
