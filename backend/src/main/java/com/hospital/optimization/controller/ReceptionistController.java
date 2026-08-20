package com.hospital.optimization.controller;

import com.hospital.optimization.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/receptionist")
@PreAuthorize("hasAnyRole('RECEPTIONIST', 'ADMIN')")
public class ReceptionistController {

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getReceptionistDashboard() {
        Map<String, Object> data = new HashMap<>();
        data.put("opdRegistrationsToday", 42);
        data.put("activeTokensGenerated", 38);
        data.put("doctorsAvailable", 12);
        data.put("pendingBillingInvoices", 5);

        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Receptionist dashboard metrics")
                .data(data)
                .build());
    }
}
