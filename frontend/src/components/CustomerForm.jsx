import React, { useState } from "react";
import { createCustomer } from "../api/customerApi";

function CustomerForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dto = { name, email, phone, address };
        try {
            await createCustomer(dto); // không cần token nữa
            alert("Tạo khách hàng thành công!");
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
        } catch (err) {
            console.error("Lỗi khi tạo khách hàng:", err);
            alert("Tạo khách hàng thất bại!");
        }
    };

    return (
        <div>
            <h3>Thêm khách hàng</h3>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit">Thêm khách hàng</button>
            </form>
        </div>
    );
}

export default CustomerForm;
