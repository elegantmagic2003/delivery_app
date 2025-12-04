import axios from "axios";

export async function login(username, password) {
    const res = await axios.post("http://localhost:8084/auth/login", {
        username,
        password,
    });
    return res.data; // backend trả token
}

export const register = async (username, password, role) => {
    const res = await axios.post("http://localhost:8080/auth/register", {
        username,
        password,
        role,
    });
    return res.data;
};
