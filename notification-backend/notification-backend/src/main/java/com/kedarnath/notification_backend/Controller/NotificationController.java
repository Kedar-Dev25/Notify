package com.kedarnath.notification_backend.Controller;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class NotificationController {

    @GetMapping("/send")
    public String sendNotification() throws FirebaseMessagingException {

        Message message = Message.builder()
                .setToken("fo814PI257s7duJwtrRSgy:APA91bHsfhcQtlqq_bOxPYGdOarNqM4Tc7bALM57I9smNfzNTOlsh48JWlcPWw8Yl9kOaurbZUlgUxBGpz2zZvyryfLAotq_NaF66g3SD_pgnVB9LZf3Dfo")
                .setNotification(
                        Notification.builder()
                                .setTitle("Test")
                                .setBody("Hello from Spring Boot")
                                .build()
                )
                .build();

        return FirebaseMessaging.getInstance().send(message);
    }
}
