import React, { useState } from "react";
import { createProduct } from "../api/productApi";

function ProductForm({ token }) {
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
        await createProduct(token, dto);
        alert("Thêm sản phẩm thành công!");
        setName("");
        setPrice("");
        setDescription("");
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
