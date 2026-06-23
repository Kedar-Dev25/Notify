package com.kedarnath.notification_backend.controller;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.kedarnath.notification_backend.model.TimeTable;
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

    private static final String FCM_TOKEN = "fo814PI257s7duJwtrRSgy:APA91bGY5o6LybQnvKy-qNAYvAnUWw0nwgXw5TyJFLs9OC2KyPzWl2PqoyHCcXMXHHSuAStyyL-lW2W4x4d223i0ps2AYNS5jh4INC8fX7j42AaMGsTn908";

    @Scheduled(fixedRate = 60000)
    public void sendNotification() throws Exception {

        String currentTime = LocalTime.now()
                .withSecond(0)
                .withNano(0)
                .toString();

        String currentWeek = LocalDate.now()
                .getDayOfWeek()
                .toString();

        List<TimeTable> classes =
                timeTableRepository.findByTimeAndWeek(currentTime, currentWeek);
        System.out.println("FCM Token = " + FCM_TOKEN);
        System.out.println("Classes found = " + classes.size());
                if (!classes.isEmpty()) {

            TimeTable tt = classes.get(0);

            Message message = Message.builder()
                    .setToken(FCM_TOKEN)
                    .setNotification(
                            Notification.builder()
                                    .setTitle("Class Reminder")
                                    .setBody(tt.getSubject() + " starts now!")
                                    .build()
                    )
                    .build();

            FirebaseMessaging.getInstance().send(message);

            System.out.println("Notification Sent!");
        }
    }
}