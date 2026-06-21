package com.kedarnath.notification_backend.controller;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.kedarnath.notification_backend.model.Student;
import com.kedarnath.notification_backend.model.TimeTable;
import com.kedarnath.notification_backend.repository.StudentRepository;
import com.kedarnath.notification_backend.repository.TimeTableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/test")
@EnableScheduling
public class NotificationController {

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private StudentRepository studentRepository;

    // OPTIONAL TEST API
    @PostMapping("/add-timetable")
    public String addTimeTable(@RequestBody TimeTable t) {
        timeTableRepository.save(t);
        return "Saved timetable";
    }

    // 🔥 MAIN SCHEDULER
    @Scheduled(fixedRate = 60000)
    public void sendScheduledNotifications() {

        String today = LocalDate.now()
                .getDayOfWeek()
                .name();

        String now = LocalTime.now()
                .withSecond(0)
                .withNano(0)
                .toString();

        List<TimeTable> list =
                timeTableRepository.findByTimeAndWeek(now, today);

        for (TimeTable t : list) {

            List<Student> students =
                    studentRepository.findByBranchAndSemester(
                            t.getBranch(),
                            t.getSemester()
                    );

            for (Student s : students) {

                try {
                    Message message = Message.builder()
                            .setToken(s.getFcmToken())
                            .setNotification(Notification.builder()
                                    .setTitle(t.getSubject())
                                    .setBody("Class at " + t.getTime())
                                    .build())
                            .build();

                    FirebaseMessaging.getInstance().send(message);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}