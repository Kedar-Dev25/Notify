package com.kedarnath.notification_backend.repository;
import java.util.Optional;
import com.kedarnath.notification_backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;         // <-- Missing Import 1
import org.springframework.data.repository.query.Param;    // <-- Missing Import 2
import java.util.List;                                     // <-- Missing Import 3

public interface StudentRepository extends JpaRepository<Student, Long> {
    
    List<Student> findByBranchAndSemester(String branch, String semester);
    Optional<Student> findByEmail(String email);
}
