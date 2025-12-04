import React from "react";
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";
import CustomerDetail from "../components/CustomerDetail";

function CustomerPage({ token }) {
    return (
        <div>
            <h3>Customers</h3>
            <CustomerList />
            <CustomerForm />
        </div>
    );
}

export default CustomerPage;
