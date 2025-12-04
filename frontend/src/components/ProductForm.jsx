import React, { useState } from "react";
import { createProduct } from "../api/productApi";

function ProductForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dto = {
            name,
            price: parseFloat(price),
            description
        };
        try {
            await createProduct(dto); // không cần token nữa
            alert("Thêm sản phẩm thành công!");
            setName("");
            setPrice("");
            setDescription("");
        } catch (err) {
            console.error("Lỗi khi thêm sản phẩm:", err);
            alert("Thêm sản phẩm thất bại!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Giá"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Thêm sản phẩm</button>
        </form>
    );
}

export default ProductForm;
