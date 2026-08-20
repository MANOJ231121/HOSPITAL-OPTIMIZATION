package com.hospital.optimization.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "departments")
public class Department {
    @Id
    private String id;
    private String name;
    private String code;
    private String headDoctorId;
    private int totalBeds;
    private int activeQueues;

    public Department() {}

    public Department(String id, String name, String code, String headDoctorId, int totalBeds, int activeQueues) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.headDoctorId = headDoctorId;
        this.totalBeds = totalBeds;
        this.activeQueues = activeQueues;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getHeadDoctorId() { return headDoctorId; }
    public void setHeadDoctorId(String headDoctorId) { this.headDoctorId = headDoctorId; }

    public int getTotalBeds() { return totalBeds; }
    public void setTotalBeds(int totalBeds) { this.totalBeds = totalBeds; }

    public int getActiveQueues() { return activeQueues; }
    public void setActiveQueues(int activeQueues) { this.activeQueues = activeQueues; }

    public static DepartmentBuilder builder() {
        return new DepartmentBuilder();
    }

    public static class DepartmentBuilder {
        private String id;
        private String name;
        private String code;
        private String headDoctorId;
        private int totalBeds;
        private int activeQueues;

        public DepartmentBuilder id(String id) { this.id = id; return this; }
        public DepartmentBuilder name(String name) { this.name = name; return this; }
        public DepartmentBuilder code(String code) { this.code = code; return this; }
        public DepartmentBuilder headDoctorId(String headDoctorId) { this.headDoctorId = headDoctorId; return this; }
        public DepartmentBuilder totalBeds(int totalBeds) { this.totalBeds = totalBeds; return this; }
        public DepartmentBuilder activeQueues(int activeQueues) { this.activeQueues = activeQueues; return this; }

        public Department build() {
            return new Department(id, name, code, headDoctorId, totalBeds, activeQueues);
        }
    }
}
