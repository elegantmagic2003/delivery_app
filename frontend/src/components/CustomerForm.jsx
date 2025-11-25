import React, { useState } from "react";
import { createCustomer } from "../api/customerApi";

function CustomerForm({ token }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dto = { name, email, phone, address };
        await createCustomer(token, dto);
        alert("Tạo khách hàng thành công!");
        setName(""); setEmail(""); setPhone(""); setAddress("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button type="submit">Thêm khách hàng</button>
        </form>
    );
}

export default CustomerForm;
