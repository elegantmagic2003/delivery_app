package com.delivery_app.route_service.controller;

import com.delivery_app.route_service.dto.RouteRequest;
import com.delivery_app.route_service.dto.RouteResponse;
import com.delivery_app.route_service.service.RouteService;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @PostMapping
    public RouteResponse getRoute(@RequestBody RouteRequest request) {
        JSONObject result = routeService.getRoute(
                request.getStartLat(),
                request.getStartLng(),
                request.getEndLat(),
                request.getEndLng()
        );

        // Parse dữ liệu trả về từ OpenRoute
        if (result.has("routes")) {
            JSONObject summary = result
                    .getJSONArray("routes")
                    .getJSONObject(0)
                    .getJSONObject("summary");

            double distance = summary.getDouble("distance");
            double duration = summary.getDouble("duration");
            String geometry = result.getJSONArray("routes").getJSONObject(0).getString("geometry");

            return new RouteResponse(distance, duration, geometry);
        }

        return new RouteResponse(0, 0, "Error: route not found");
    }
}