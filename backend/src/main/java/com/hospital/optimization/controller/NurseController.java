package com.hospital.optimization.controller;

import com.hospital.optimization.dto.ApiResponse;
import com.hospital.optimization.model.Bed;
import com.hospital.optimization.repository.BedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nurse")
@PreAuthorize("hasAnyRole('NURSE', 'ADMIN')")
public class NurseController {

    @Autowired
    private BedRepository bedRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getNurseDashboard() {
        Map<String, Object> data = new HashMap<>();
        data.put("assignedWard", "ICU Ward 2");
        data.put("patientsUnderCare", 6);
        data.put("availableBedsCount", bedRepository.findByStatus("AVAILABLE").size());
        data.put("occupiedBedsCount", bedRepository.findByStatus("OCCUPIED").size());

        return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("Nurse dashboard metrics")
                .data(data)
                .build());
    }

    @GetMapping("/beds")
    public ResponseEntity<ApiResponse<List<Bed>>> getBedsStatus() {
        return ResponseEntity.ok(ApiResponse.<List<Bed>>builder()
                .success(true)
                .message("Beds information")
                .data(bedRepository.findAll())
                .build());
    }
}
