package com.delivery_app.route_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "routes")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;      // liên kết với đơn hàng
    private double distance;   // quãng đường (m)
    private double duration;   // thời gian (s)

    @Column(columnDefinition = "TEXT")
    private String geometry;   // dữ liệu polyline để vẽ tuyến đường
}
