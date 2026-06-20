package com.kedarnath.notification_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.kedarnath.notification_backend.model.Student;
import com.kedarnath.notification_backend.repository.StudentRepository;


@RestController
@CrossOrigin(origins =  "http://localhost:5173")
public class StudentController {
         private final StudentRepository repository;

         public StudentController(StudentRepository repository) {
            this.repository = repository;
         }

         @PostMapping("/student")                                
         public String StudentFunction(@RequestBody Student request) {
            repository.save(request);

            return "Saved SucessFully";
         }
}
