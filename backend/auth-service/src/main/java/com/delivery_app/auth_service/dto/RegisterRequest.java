package com.delivery_app.auth_service.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String role;   // optional, mặc định USER nếu không có
}
