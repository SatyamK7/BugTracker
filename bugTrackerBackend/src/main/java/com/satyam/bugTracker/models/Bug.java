package com.satyam.bugTracker.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.satyam.bugTracker.enums.BugStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
@Table(name = "bugs")
public class Bug {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private BugStatus status;


    private String screenshotPath;

    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;
//    private Long reporter;

    @ManyToOne
    @JoinColumn(name = "assignedId")
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private User assignedTo;
//    private Long assignedTo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;
//    private Long project;


}
