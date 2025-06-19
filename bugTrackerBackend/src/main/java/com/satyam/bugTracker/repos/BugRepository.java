package com.satyam.bugTracker.repos;

import com.satyam.bugTracker.models.Bug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BugRepository extends JpaRepository<Bug, Long> {
}
