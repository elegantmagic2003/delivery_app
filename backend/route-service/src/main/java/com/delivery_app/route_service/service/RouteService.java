package com.delivery_app.route_service.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class RouteService {

    @Value("${openrouteservice.api.key}")
    private String apiKey;

    private final String ORS_URL = "https://api.openrouteservice.org/v2/directions/driving-car";

    public JSONObject getRoute(double startLat, double startLng, double endLat, double endLng) {
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
}