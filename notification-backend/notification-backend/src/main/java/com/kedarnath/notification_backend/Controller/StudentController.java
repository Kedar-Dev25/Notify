package com.kedarnath.notification_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.kedarnath.notification_backend.model.Student;
import com.kedarnath.notification_backend.repository.StudentRepository;
import java.util.Optional;

@RestController
@CrossOrigin(origins =  "http://localhost:5173")
public class StudentController {
         private final StudentRepository repository;

         public StudentController(StudentRepository repository) {
            this.repository = repository;
         }

        @PostMapping("/student")
     public String StudentFunction(@RequestBody Student request) {

    Optional<Student> existing =
            repository.findByEmail(request.getEmail());

    if(existing.isPresent()) {

        Student student = existing.get();

        student.setBranch(request.getBranch());
        student.setSemester(request.getSemester());
        student.setFcmToken(request.getFcmToken());

        repository.save(student);

        return "Updated Successfully";
    }

    repository.save(request);

    return "Saved Successfully";
}
}
