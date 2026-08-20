package com.hospital.optimization.controller;

import com.hospital.optimization.dto.ApiResponse;
import com.hospital.optimization.dto.UserDto;
import com.hospital.optimization.model.User;
import com.hospital.optimization.model.UserRole;
import com.hospital.optimization.repository.UserRepository;
import com.hospital.optimization.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("patientsCount", userRepository.countByRole(UserRole.PATIENT));
        stats.put("doctorsCount", userRepository.countByRole(UserRole.DOCTOR));
        stats.put("nursesCount", userRepository.countByRole(UserRole.NURSE));
        stats.put("receptionistsCount", userRepository.countByRole(UserRole.RECEPTIONIST));
        stats.put("systemStatus", "OPERATIONAL");

        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Admin statistics retrieved")
                .data(stats)
                .build());
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers() {
        List<UserDto> users = userRepository.findAll().stream()
                .map(authService::mapToUserDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.<List<UserDto>>builder()
                .success(true)
                .message("All users listed")
                .data(users)
                .build());
    }

    @PostMapping("/users/staff")
    public ResponseEntity<ApiResponse<UserDto>> createStaffUser(@RequestBody User staffUser) {
        if (userRepository.existsByEmail(staffUser.getEmail())) {
            return ResponseEntity.badRequest().body(ApiResponse.<UserDto>builder()
                    .success(false)
                    .message("User with this email already exists")
                    .build());
        }

        staffUser.setPassword(passwordEncoder.encode(staffUser.getPassword()));
        staffUser.setActive(true);
        User saved = userRepository.save(staffUser);

        return ResponseEntity.ok(ApiResponse.<UserDto>builder()
                .success(true)
                .message("Staff member created successfully")
                .data(authService.mapToUserDto(saved))
                .build());
    }
}
