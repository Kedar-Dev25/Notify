FROM openjdk:17

WORKDIR /app

COPY target/notification-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java","-jar","app.jar"]