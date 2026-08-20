package com.hospital.optimization.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "queues")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QueueItem {
    @Id
    private String id;
    private String tokenNumber;
    private String patientId;
    private String patientName;
    private String doctorId;
    private String department;
    private int priority; // 1 = Normal, 2 = Emergency
    private String status; // WAITING, IN_CONSULTATION, COMPLETED, SKIPPED
    private int estimatedWaitMinutes;
    private LocalDateTime createdAt;
}
