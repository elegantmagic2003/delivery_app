package com.delivery_app.route_service.dto;

import lombok.Data;

@Data
public class RouteRequest {
    private double startLat;
    private double startLng;
    private double endLat;
    private double endLng;
}