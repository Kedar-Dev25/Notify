package com.kedarnath.notification_backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.kedarnath.notification_backend.model.TimeTable;
import com.kedarnath.notification_backend.repository.TimeTableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@CrossOrigin(origins =  "http://localhost:5173")

public class TimeTableController {


         @Autowired
         private TimeTableRepository timeTableRepository;

         @PostMapping("/save-timetable")  
         public void saveTimeTable(@RequestBody TimeTable t)  {
            timeTableRepository.save(t);
         }                             
}
