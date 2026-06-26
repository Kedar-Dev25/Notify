package com.kedarnath.notification_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kedarnath.notification_backend.model.TimeTable;
import java.util.List;
import java.time.LocalTime;
public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {
List<TimeTable> findByWeekAndTimeBetween(
    String week,
    LocalTime start,
    LocalTime end
);    
}