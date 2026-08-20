package com.hospital.optimization.config;

import com.hospital.optimization.model.*;
import com.hospital.optimization.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private BedRepository bedRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            System.out.println(">>> Initializing default accounts for 5 roles...");

            // 1. ADMIN
            User admin = User.builder()
                    .name("System Admin")
                    .email("admin@hospital.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .phone("+1 555-0101")
                    .role(UserRole.ADMIN)
                    .active(true)
                    .department("Administration")
                    .build();
            userRepository.save(admin);

            // 2. DOCTOR
            User doctor = User.builder()
                    .name("Dr. Sarah Jenkins")
                    .email("doctor@hospital.com")
                    .password(passwordEncoder.encode("Doctor@123"))
                    .phone("+1 555-0102")
                    .role(UserRole.DOCTOR)
                    .active(true)
                    .specialization("Cardiology")
                    .department("Cardiology")
                    .roomNumber("OPD-302")
                    .build();
            userRepository.save(doctor);

            // 3. NURSE
            User nurse = User.builder()
                    .name("Nurse Emily Carter")
                    .email("nurse@hospital.com")
                    .password(passwordEncoder.encode("Nurse@123"))
                    .phone("+1 555-0103")
                    .role(UserRole.NURSE)
                    .active(true)
                    .department("ICU Ward 2")
                    .build();
            userRepository.save(nurse);

            // 4. RECEPTIONIST
            User receptionist = User.builder()
                    .name("Michael Vance")
                    .email("receptionist@hospital.com")
                    .password(passwordEncoder.encode("Receptionist@123"))
                    .phone("+1 555-0104")
                    .role(UserRole.RECEPTIONIST)
                    .active(true)
                    .department("Front Desk")
                    .build();
            userRepository.save(receptionist);

            // 5. PATIENT
            User patient = User.builder()
                    .name("John Doe")
                    .email("patient@hospital.com")
                    .password(passwordEncoder.encode("Patient@123"))
                    .phone("+1 555-0105")
                    .role(UserRole.PATIENT)
                    .active(true)
                    .gender("Male")
                    .dateOfBirth("1990-05-15")
                    .address("742 Evergreen Terrace, Springfield")
                    .emergencyContact("Jane Doe (+1 555-0999)")
                    .build();
            userRepository.save(patient);

            System.out.println(">>> Sample Users Initialized Successfully:");
            System.out.println("    ADMIN: admin@hospital.com / Admin@123");
            System.out.println("    DOCTOR: doctor@hospital.com / Doctor@123");
            System.out.println("    NURSE: nurse@hospital.com / Nurse@123");
            System.out.println("    RECEPTIONIST: receptionist@hospital.com / Receptionist@123");
            System.out.println("    PATIENT: patient@hospital.com / Patient@123");
        }

        if (departmentRepository.count() == 0) {
            departmentRepository.save(Department.builder().name("Cardiology").code("CARD").headDoctorId("doc1").totalBeds(30).activeQueues(12).build());
            departmentRepository.save(Department.builder().name("Orthopedics").code("ORTHO").headDoctorId("doc2").totalBeds(25).activeQueues(8).build());
            departmentRepository.save(Department.builder().name("Pediatrics").code("PED").headDoctorId("doc3").totalBeds(20).activeQueues(5).build());
            departmentRepository.save(Department.builder().name("Neurology").code("NEURO").headDoctorId("doc4").totalBeds(15).activeQueues(4).build());
        }

        if (bedRepository.count() == 0) {
            bedRepository.save(Bed.builder().bedNumber("ICU-101").wardName("ICU").department("Cardiology").status("OCCUPIED").assignedPatientName("Robert Paulson").build());
            bedRepository.save(Bed.builder().bedNumber("ICU-102").wardName("ICU").department("Cardiology").status("AVAILABLE").build());
            bedRepository.save(Bed.builder().bedNumber("GEN-201").wardName("General Ward A").department("Orthopedics").status("AVAILABLE").build());
        }
    }
}
