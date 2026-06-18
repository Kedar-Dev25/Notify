package com.kedarnath.notification_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kedarnath.notification_backend.Model.TimeTable;

public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {
    
}