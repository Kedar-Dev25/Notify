package com.kedarnath.notification_backend.controller;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.Message;
import com.kedarnath.notification_backend.repository.StudentRepository;
import com.kedarnath.notification_backend.repository.TimeTableRepository;
import com.kedarnath.notification_backend.model.TimeTable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/test")
public class NotificationController {

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/send")
public String sendNotification() throws Exception {

    String token = "fo814PI257s7duJwtrRSgy:APA91bGY5o6LybQnvKy-qNAYvAnUWw0nwgXw5TyJFLs9OC2KyPzWl2PqoyHCcXMXHHSuAStyyL-lW2W4x4d223i0ps2AYNS5jh4INC8fX7j42AaMGsTn908";
    System.out.println("Token is : "+ token);

    Message message = Message.builder()
            .setToken(token)
            .setNotification(Notification.builder()
                    .setTitle("TEST 🚀")
                    .setBody("Direct hit notification working!")
                    .build())
            .build();

    String response = FirebaseMessaging.getInstance().send(message);

    return "Sent: " + response;
}
}