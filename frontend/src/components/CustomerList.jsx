import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../api/customerApi";

function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCustomers(); // không cần token nữa
                setCustomers(data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách khách hàng:", err);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id); // không cần token nữa
            setCustomers(customers.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Lỗi khi xóa khách hàng:", err);
        }
    };

    return (
        <div>
            <h3>Danh sách khách hàng</h3>
            <ul>
                {customers.map((c) => (
                    <li key={c.id}>
                        {c.id} | {c.name} | {c.email} | {c.phone} | {c.address}
                        <button onClick={() => handleDelete(c.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomerList;
