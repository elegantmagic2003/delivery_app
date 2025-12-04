package com.delivery_app.route_service.service;

import com.delivery_app.route_service.entity.Route;
import com.delivery_app.route_service.repository.RouteRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class RouteService {

    @Value("${openrouteservice.api.key}")
    private String apiKey;

    private final String ORS_URL = "https://api.openrouteservice.org/v2/directions/driving-car";

    private final RouteRepository routeRepository;

    public RouteService(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public JSONObject callOpenRoute(double startLat, double startLng, double endLat, double endLng) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            JSONObject body = new JSONObject();
            body.put("coordinates", new double[][]{
                    {startLng, startLat},
                    {endLng, endLat}
            });

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            headers.set("Authorization", apiKey);

            HttpEntity<String> entity = new HttpEntity<>(body.toString(), headers);
            ResponseEntity<String> response = restTemplate.exchange(ORS_URL, HttpMethod.POST, entity, String.class);

            return new JSONObject(response.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject error = new JSONObject();
            error.put("error", "Unable to fetch route");
            return error;
        }
    }

    public Route saveRoute(Long orderId, double distance, double duration, String geometry) {
        Route route = new Route();
        route.setOrderId(orderId);
        route.setDistance(distance);
        route.setDuration(duration);
        route.setGeometry(geometry);
        return routeRepository.save(route);
    }

    public Route getRouteByOrderId(Long orderId) {
        return routeRepository.findByOrderId(orderId).orElse(null);
    }

    public JSONObject getRoute(double startLat, double startLng, double endLat, double endLng) {
        return callOpenRoute(startLat, startLng, endLat, endLng);
    }
}
