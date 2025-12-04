import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts(); // không cần token nữa
                setProducts(data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", err);
                setProducts([]);
            }
        }
        fetchProducts();
    }, []);

    return (
        <ul>
            {products.map((p) => (
                <li key={p.id}>
                    {p.name} - {p.price}đ
                </li>
            ))}
        </ul>
    );
}

export default ProductList;
