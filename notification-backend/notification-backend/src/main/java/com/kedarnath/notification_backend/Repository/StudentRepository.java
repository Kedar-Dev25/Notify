package com.kedarnath.notification_backend.Repository;

import com.kedarnath.notification_backend.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
               
}