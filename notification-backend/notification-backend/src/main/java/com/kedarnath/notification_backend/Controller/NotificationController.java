package com.kedarnath.notification_backend.controller;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.kedarnath.notification_backend.model.Student;
import com.kedarnath.notification_backend.model.TimeTable;
import com.kedarnath.notification_backend.repository.StudentRepository;
import com.kedarnath.notification_backend.repository.TimeTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private StudentRepository studentRepository;

    // 🔥 EXTERNAL TRIGGER ENDPOINT (GitHub Actions / Cron will call this)
    @GetMapping("/send-notification")
    public String sendNotification() {

        LocalTime now = LocalTime.now();
        String currentWeek = LocalDate.now().getDayOfWeek().toString();

        System.out.println("CURRENT TIME = " + now);
        System.out.println("CURRENT WEEK = " + currentWeek);

        List<TimeTable> classes =
                timeTableRepository.findByTimeAndWeek(now.toString(), currentWeek);

        System.out.println("CLASSES FOUND = " + classes.size());

        if (classes.isEmpty()) {
            System.out.println("NO CLASS MATCHED ❌");
            return "No classes found";
        }

        for (TimeTable tt : classes) {

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
                                        .setBody(tt.getSubject() + " starts now!")
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

        System.out.println("NOTIFICATION COMPLETED ✅");
        return "Notification process completed";
    }
}