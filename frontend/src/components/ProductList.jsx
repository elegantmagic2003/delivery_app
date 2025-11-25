import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

function ProductList({ token }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts(token).then(setProducts);
    }, [token]);

    return (
        <ul>
            {products.map((p) => (
                <li key={p.id}>{p.name} - {p.price}đ</li>
            ))}
        </ul>
    );
}

export default ProductList;
