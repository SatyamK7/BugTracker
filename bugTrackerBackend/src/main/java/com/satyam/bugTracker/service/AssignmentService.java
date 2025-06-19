package com.satyam.bugTracker.service;

import com.satyam.bugTracker.repos.AssignmentRepository;
import com.satyam.bugTracker.repos.BugRepository;
import com.satyam.bugTracker.repos.UserRepository;
import com.satyam.bugTracker.models.Bug;
import com.satyam.bugTracker.models.User;
import com.satyam.bugTracker.models.Assignment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final BugRepository bugRepository;
    private final UserRepository userRepository;

    public Assignment assignBug(Long bugId, Long userId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new RuntimeException("Bug not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Assignment assignment = new Assignment();
        assignment.setBug(bug);
        assignment.setAssignee(user);
        assignment.setAssignedAt(LocalDateTime.now());

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsForBug(Long bugId) {
        return assignmentRepository.findByBugId(bugId);
    }
}

