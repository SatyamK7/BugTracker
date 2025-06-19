package com.satyam.bugTracker.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "assign")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime assignedAt;

    @ManyToOne
//    @JoinColumn
    @JoinColumn(name = "bug_Id_assign")
    private Bug bug;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;
}
