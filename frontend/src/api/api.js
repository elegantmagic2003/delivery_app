import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // API Gateway của cậu
    headers: { "Content-Type": "application/json" }
});

export default api;
