import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";
import OrderUpdateForm from "./components/OrderUpdateForm";
import OrderDetail from "./components/OrderDetail";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerDetail from "./components/CustomerDetail";

function App() {
    const [token, setToken] = useState(null);

    return (
        <div style={{ padding: "20px" }}>
            {!token ? (
                <LoginForm onLogin={setToken} />
            ) : (
                <>
                    <h2>Products</h2>
                    <ProductList token={token} />
                    <ProductForm token={token} />

                    <h2>Orders</h2>
                    <OrderList token={token} />
                    <OrderForm token={token} />
                    <OrderUpdateForm token={token} />
                    <OrderDetail token={token} />

                    <h2>Customers</h2>
                    <CustomerList token={token} />
                    <CustomerForm token={token} />
                    <CustomerDetail token={token} />
                </>
            )}
        </div>
    );
}

export default App;
