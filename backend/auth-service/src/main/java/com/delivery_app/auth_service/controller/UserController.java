package com.delivery_app.auth_service.controller;

import com.delivery_app.auth_service.model.User;
import com.delivery_app.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/me")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Lấy thông tin cá nhân của user hiện tại
    @GetMapping
    public ResponseEntity<User> getProfile(Authentication auth) {
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(null); // ẩn password khi trả về
        return ResponseEntity.ok(user);
    }

    // Cập nhật thông tin cá nhân
    @PutMapping
    public ResponseEntity<String> updateProfile(Authentication auth, @RequestBody User update) {
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (update.getFullName() != null) user.setFullName(update.getFullName());
        if (update.getPhone() != null) user.setPhone(update.getPhone());
        if (update.getEmail() != null) user.setEmail(update.getEmail());
        if (update.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(update.getPassword()));
        }

        userRepository.save(user);
        return ResponseEntity.ok("Profile updated successfully!");
    }
}
