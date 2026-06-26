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
import org.springframework.web.bind.annotation.RestController;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@EnableScheduling
public class NotificationController {

    @Autowired
    private TimeTableRepository timeTableRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Scheduled(cron = "0 * * * * *")
public void sendNotification() {

    LocalTime now = LocalTime.now().withSecond(0).withNano(0);
    String currentWeek = LocalDate.now().getDayOfWeek().toString();
    String currentTime = now.toString();

    System.out.println("CURRENT TIME = " + currentTime);
    System.out.println("CURRENT WEEK = " + currentWeek);

    List<TimeTable> classes =
            timeTableRepository.findByTimeAndWeek(currentTime, currentWeek);

    System.out.println("CLASSES FOUND = " + classes.size());

    if (classes.isEmpty()) {
        System.out.println("NO CLASS MATCHED ❌");
        return;
    }

    for (TimeTable tt : classes) {

        System.out.println("CLASS = " + tt.getSubject());
        System.out.println("BRANCH = " + tt.getBranch());
        System.out.println("SEMESTER = " + tt.getSemester());

        List<Student> students =
                studentRepository.findByBranchAndSemester(
                        tt.getBranch(),
                        tt.getSemester()
                );

        System.out.println("STUDENTS FOUND = " + students.size());

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
                String response = FirebaseMessaging.getInstance().send(message);
                System.out.println("FCM RESPONSE = " + response);

            } catch (Exception e) {
                System.out.println("FAILED FOR STUDENT = " + student.getId());
            }
        }
    }

    System.out.println("NOTIFICATION LOOP COMPLETED ✅");
    }
}