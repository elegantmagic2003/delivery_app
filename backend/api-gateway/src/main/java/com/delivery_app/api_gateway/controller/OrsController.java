package com.delivery_app.api_gateway.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/ors")
public class OrsController {

    private final WebClient webClient;

    @Value("${ors.api.key}")
    private String apiKey;

    public OrsController() {
        this.webClient = WebClient.create("https://api.openrouteservice.org");
    }

    // Proxy cho ORS Matrix API
    @PostMapping(value = "/matrix", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Mono<String> getMatrix(@RequestBody Map<String, Object> body) {
        return webClient.post()
                .uri("/v2/matrix/driving-car")
                .header("Authorization", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class);
    }

    // Proxy cho ORS Geocode API
    @GetMapping("/geocode")
    public Mono<String> geocode(@RequestParam String text) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/geocode/search")
                        .queryParam("api_key", apiKey)
                        .queryParam("text", text)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}
