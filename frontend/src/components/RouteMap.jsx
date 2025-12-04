import React from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import polyline from "polyline";
import "leaflet/dist/leaflet.css";

function FitBounds({ coords }) {
    const map = useMap();
    React.useEffect(() => {
        if (coords?.length > 0) {
            map.fitBounds(coords);
        }
    }, [coords, map]);
    return null;
}

export default function RouteMap({ geometry, start, end }) {
    if (!geometry) return <p>Không có dữ liệu tuyến đường</p>;

    let coords = [];
    try {
        coords = polyline.decode(geometry); // [[lat, lng], ...]
    } catch (err) {
        console.error("Lỗi decode geometry:", err);
        return <p>Geometry không hợp lệ</p>;
    }

    const startPos = Array.isArray(start) ? start : [start.lat, start.lng];
    const endPos = Array.isArray(end) ? end : [end.lat, end.lng];

    return (
        <MapContainer
            center={coords[0]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={coords} color="blue" />
            <Marker position={startPos} />
            <Marker position={endPos} />
            <FitBounds coords={coords} />
        </MapContainer>
    );
}
