import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../api/customerApi";

function CustomerList({ token }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers(token).then(setCustomers);
    }, [token]);

    const handleDelete = async (id) => {
        await deleteCustomer(token, id);
        setCustomers(customers.filter(c => c.id !== id));
    };

    return (
        <div>
            <h3>Danh sách khách hàng</h3>
            <ul>
                {customers.map((c) => (
                    <li key={c.id}>
                        {c.name} | {c.email} | {c.phone} | {c.address}
                        <button onClick={() => handleDelete(c.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomerList;
