package com.kedarnath.notification_backend.repository;

import com.kedarnath.notification_backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;         // <-- Missing Import 1
import org.springframework.data.repository.query.Param;    // <-- Missing Import 2
import java.util.List;                                     // <-- Missing Import 3

public interface StudentRepository extends JpaRepository<Student, Long> {
    
    @Query("SELECT s.fcmToken FROM Student s WHERE s.branch = :branch AND s.semester = :sem")
    List<String> findTokensByBranchAndSemester(@Param("branch") String branch, @Param("sem") String sem);
}