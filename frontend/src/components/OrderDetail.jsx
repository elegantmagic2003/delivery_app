import React, { useEffect, useState } from "react";
import RouteMap from "./RouteMap";
import api from "../api/axiosInstance";
import "./OrderDetail.css"; // import CSS riêng

function OrderDetail({ order, onEdit }) {
    const [route, setRoute] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRoute() {
            if (!order) return;
            setLoading(true);
            setError("");

            try {
                const customerRes = await api.get(`/customers/${order.customerId}`);
                const customer = customerRes.data;

                const geoRes = await api.get(
                    `/ors/geocode?text=${encodeURIComponent(customer.address)}`
                );
                const geoData = geoRes.data;
                if (!geoData.features || geoData.features.length === 0) {
                    throw new Error("Không tìm thấy tọa độ khách hàng");
                }
                const customerLng = geoData.features[0].geometry.coordinates[0];
                const customerLat = geoData.features[0].geometry.coordinates[1];

                const warehousesRes = await api.get(`/warehouses`);
                const warehouses = warehousesRes.data;

                if (!Array.isArray(warehouses) || warehouses.length === 0) {
                    throw new Error("Không có kho nào trong hệ thống");
                }

                const body = {
                    locations: [
                        [customerLng, customerLat],
                        ...warehouses.map((w) => [w.longitude, w.latitude]),
                    ],
                    metrics: ["distance"],
                };

                const matrixRes = await api.post(`/ors/matrix`, body);
                const matrixData = matrixRes.data;

                let minIndex = 1;
                let minDistance = matrixData.distances[0][1];
                for (let i = 2; i < matrixData.distances[0].length; i++) {
                    if (matrixData.distances[0][i] < minDistance) {
                        minDistance = matrixData.distances[0][i];
                        minIndex = i;
                    }
                }
                const nearestWarehouse = warehouses[minIndex - 1];

                const routeRes = await api.post(`/routes`, {
                    startLat: nearestWarehouse.latitude,
                    startLng: nearestWarehouse.longitude,
                    endLat: customerLat,
                    endLng: customerLng,
                });
                const routeData = routeRes.data;

                setRoute({
                    ...routeData,
                    startLat: nearestWarehouse.latitude,
                    startLng: nearestWarehouse.longitude,
                    endLat: customerLat,
                    endLng: customerLng,
                });
            } catch (err) {
                console.error("Lỗi khi lấy tuyến đường:", err);
                setError(err?.message || "Không thể tải tuyến đường");
            } finally {
                setLoading(false);
            }
        }

        fetchRoute();
    }, [order]);

    if (!order) return null;

    return (
        <div className="order-detail">
            <h4>Order #{order.id}</h4>
            <p>Customer: {order.customerId}</p>
            <p>Status: {order.status}</p>
            <p>Created At: {order.createdAt}</p>

            <h5>Items:</h5>
            <ul>
                {Array.isArray(order.items) &&
                    order.items.map((item) => (
                        <li key={item.id}>
                            Product: {item.productId} | Quantity: {item.quantity}
                        </li>
                    ))}
            </ul>

            <div className="route-section">
                <h5>Tuyến đường giao hàng</h5>
                {loading && <p>Đang tải tuyến đường...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {route && route.geometry && (
                    <div className="route-box">
                        <div className="route-map">
                            <RouteMap
                                geometry={route.geometry}
                                start={[route.startLat, route.startLng]}
                                end={[route.endLat, route.endLng]}
                            />
                        </div>
                        <p>Distance: {route.distance} m</p>
                        <p>Duration: {Math.round(route.duration / 60)} phút</p>
                    </div>
                )}
            </div>

            <button onClick={onEdit} className="edit-button">
                Sửa đơn hàng
            </button>
        </div>
    );
}

export default OrderDetail;
