package com.satyam.bugTracker.models;

import com.satyam.bugTracker.enums.Role;
import jakarta.persistence.*;
import lombok.Data;



@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // ADMIN, TESTER, DEVELOPER
}

