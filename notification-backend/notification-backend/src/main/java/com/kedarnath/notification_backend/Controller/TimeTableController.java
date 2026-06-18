package com.kedarnath.notification_backend.Controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.kedarnath.notification_backend.Model.TimeTable;
import com.kedarnath.notification_backend.Repository.TimeTableRepository;

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
