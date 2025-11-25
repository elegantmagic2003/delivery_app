export async function getProducts(token) {
    const res = await fetch("http://localhost:8080/products", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function createProduct(token, product) {
    const res = await fetch("http://localhost:8080/products/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });
    return res.json();
}
