package com.delivery_app.auth_service.service;

import com.delivery_app.auth_service.dto.RegisterRequest;
import com.delivery_app.auth_service.model.User;
import com.delivery_app.auth_service.repository.UserRepository;
import com.delivery_app.auth_service.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Đăng ký tài khoản mới
    public String register(RegisterRequest req) {
        // Kiểm tra trùng username
        userRepository.findByUsername(req.getUsername()).ifPresent(u -> {
            throw new RuntimeException("Username already exists");
        });

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(req.getPassword());

        // Gán role mặc định nếu chưa có
        String role = (req.getRole() == null || req.getRole().isBlank())
                ? "USER"
                : req.getRole().toUpperCase();

        // Tạo entity và lưu
        User user = User.builder()
                .username(req.getUsername())
                .password(encodedPassword)
                .role(role)
                .status("active") // nếu dùng status, gán mặc định active
                .build();

        userRepository.save(user);
        return "User registered successfully!";
    }

    // Đăng nhập, trả về JWT
    public String login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Nếu dùng status để khóa tài khoản
        if (user.getStatus() != null && !"active".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Account is blocked");
        }

        // Kiểm tra mật khẩu
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Tạo JWT kèm role
        return jwtUtil.generateToken(user.getId(), user.getUsername(), user.getRole());
    }
}
