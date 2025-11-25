export async function getCustomers(token) {
    const res = await fetch("http://localhost:8080/customers", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function createCustomer(token, customer) {
    const res = await fetch("http://localhost:8080/customers/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer),
    });
    return res.json();
}

export async function updateCustomer(token, id, customer) {
    const res = await fetch(`http://localhost:8080/customers/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer),
    });
    return res.json();
}

export async function deleteCustomer(token, id) {
    await fetch(`http://localhost:8080/customers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function getCustomerById(token, id) {
    const res = await fetch(`http://localhost:8080/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}
