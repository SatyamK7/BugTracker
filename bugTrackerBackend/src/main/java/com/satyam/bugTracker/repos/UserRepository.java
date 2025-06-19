package com.satyam.bugTracker.repos;

import com.satyam.bugTracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User getUserByEmail(String email);
    // You can add custom query methods if needed (e.g., findByEmail)
}
