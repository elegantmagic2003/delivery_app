import api from "./axiosInstance";

export async function getProducts() {
    const res = await api.get("/products");
    return res.data;
}

export async function createProduct(product) {
    const res = await api.post("/products/new", product);
    return res.data;
}
