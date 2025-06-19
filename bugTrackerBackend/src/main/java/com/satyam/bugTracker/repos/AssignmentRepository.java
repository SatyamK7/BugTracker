package com.satyam.bugTracker.repos;

import com.satyam.bugTracker.models.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByBugId(Long bugId); // used in getAssignmentsForBug()
}
