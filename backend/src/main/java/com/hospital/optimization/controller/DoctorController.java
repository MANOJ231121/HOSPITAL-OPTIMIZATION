package com.hospital.optimization.controller;

import com.hospital.optimization.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctor")
@PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
public class DoctorController {

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDoctorDashboard() {
        Map<String, Object> data = new HashMap<>();
        data.put("assignedPatientsCount", 8);
        data.put("todayAppointments", 5);
        data.put("pendingConsultations", 3);
        data.put("currentQueueToken", "DOC-CARD-004");
        data.put("department", "Cardiology");
        
        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Doctor dashboard metrics")
                .data(data)
                .build());
    }

    @GetMapping("/patients")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAssignedPatients() {
        List<Map<String, Object>> patients = List.of(
                Map.of("id", "p1", "name", "John Doe", "age", 34, "condition", "Post-op Checkup", "queueToken", "DOC-CARD-001"),
                Map.of("id", "p2", "name", "Alice Smith", "age", 58, "condition", "Hypertension Consultation", "queueToken", "DOC-CARD-002")
        );
        return ResponseEntity.ok(ApiResponse.<List<Map<String, Object>>>builder()
                .success(true)
                .message("Assigned patients list")
                .data(patients)
                .build());
    }
}
