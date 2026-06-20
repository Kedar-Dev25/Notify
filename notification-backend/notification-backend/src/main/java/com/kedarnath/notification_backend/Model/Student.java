package com.kedarnath.notification_backend.model;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String branch;
    private String semester;
    private String fcmToken;

    public Long getId() {
        return id;
    }

    public String getBranch() {
        return branch;
    }

    public String getSemester() {
        return semester;
    }
    public String getFcmToken() {
        return fcmToken;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }
    public void setFcmToken(String fcmToken) {
        this.fcmToken =  fcmToken;
    }
}