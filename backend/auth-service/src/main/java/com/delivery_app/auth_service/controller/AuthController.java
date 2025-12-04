package com.delivery_app.auth_service.controller;

import com.delivery_app.auth_service.dto.LoginRequest;
import com.delivery_app.auth_service.dto.RegisterRequest;
import com.delivery_app.auth_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // Đăng ký tài khoản mới
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest req) {
        String result = authService.register(req);
        return ResponseEntity.ok(result);
    }

    // Đăng nhập, trả về JWT
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req) {
        String token = authService.login(req.getUsername(), req.getPassword());
        return ResponseEntity.ok(token);
    }
}
