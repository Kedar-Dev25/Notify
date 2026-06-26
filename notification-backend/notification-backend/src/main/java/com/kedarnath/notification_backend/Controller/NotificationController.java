package com.kedarnath.notification_backend.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.kedarnath.notification_backend.model.Student;
import com.kedarnath.notification_backend.model.TimeTable;
import com.kedarnath.notification_backend.repository.StudentRepository;
import com.kedarnath.notification_backend.repository.TimeTableRepository;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/send-notification")
    public String sendNotification() {

        // 📅 Day
        String currentWeek = LocalDate.now().getDayOfWeek().toString();

        // ⏰ Time window (30 min safe buffer)
        LocalTime now = LocalTime.now().withSecond(0).withNano(0);
        LocalTime end = now.plusMinutes(30);


        System.out.println("START TIME = " + now);
        System.out.println("END TIME = " + end);
        System.out.println("WEEK = " + currentWeek);

        // 📌 Fetch classes in time window
        List<TimeTable> classes =
                timeTableRepository.findByWeekAndTimeBetween(
                        currentWeek,
                        now,
                        end
                );

        if (classes.isEmpty()) {
            System.out.println("NO CLASS MATCHED ❌");
            return "No classes found";
        }

        for (TimeTable tt : classes) {

            System.out.println("CLASS = " + tt.getSubject());

            // 🎯 filter students by branch + semester
            List<Student> students =
                    studentRepository.findByBranchAndSemester(
                            tt.getBranch(),
                            tt.getSemester()
                    );

            for (Student student : students) {

                if (student.getFcmToken() == null || student.getFcmToken().isEmpty()) {
                    continue;
                }

                Message message = Message.builder()
                        .setToken(student.getFcmToken())
                        .setNotification(
                                Notification.builder()
                                        .setTitle("Class Reminder")
                                        .setBody(tt.getSubject() + " starts soon!")
                                        .build()
                        )
                        .build();

                try {
                    FirebaseMessaging.getInstance().send(message);
                    System.out.println("SENT TO = " + student.getId());

                } catch (Exception e) {
                    System.out.println("FAILED FOR STUDENT = " + student.getId());
                }
            }
        }

        return "Notification process completed";
    }
}