package com.hospital.optimization.repository;

import com.hospital.optimization.model.QueueItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueueRepository extends MongoRepository<QueueItem, String> {
    List<QueueItem> findByPatientId(String patientId);
    List<QueueItem> findByDoctorId(String doctorId);
    List<QueueItem> findByDepartment(String department);
}
