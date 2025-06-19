package com.satyam.bugTracker.repos;

import com.satyam.bugTracker.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
