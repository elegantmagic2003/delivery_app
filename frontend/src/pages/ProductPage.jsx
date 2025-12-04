import React from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

function ProductPage({ token }) {
    return (
        <div>
            <h3>Products</h3>
            <ProductList />
            <ProductForm />
        </div>
    );
}

export default ProductPage;
