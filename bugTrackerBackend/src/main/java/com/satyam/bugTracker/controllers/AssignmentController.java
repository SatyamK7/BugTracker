package com.satyam.bugTracker.controllers;

import com.satyam.bugTracker.models.Assignment;
import com.satyam.bugTracker.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.satyam.bugTracker.dtos.AssignmentRequest;
import com.satyam.bugTracker.repos.BugRepository;
import com.satyam.bugTracker.repos.UserRepository;
import com.satyam.bugTracker.models.Bug;
import com.satyam.bugTracker.models.User;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final BugRepository bugRepository;
    private final UserRepository userRepository;


    @Autowired
    public AssignmentController(AssignmentService assignmentService, BugRepository bugRepository, UserRepository userRepository) {
        this.assignmentService = assignmentService;
        this.bugRepository = bugRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Assignment> assignBug(@RequestBody AssignmentRequest assignmentRequest) {
        Bug bug = bugRepository.findById(assignmentRequest.bugId())
                .orElseThrow(() -> new RuntimeException("Bug not found"));
        User user = userRepository.findById(assignmentRequest.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(assignmentService.assignBug(bug.getId(), user.getId()));
    }

    @GetMapping("/bug/{bugId}")
    public ResponseEntity<List<Assignment>> getAssignmentsForBug(@PathVariable Long bugId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsForBug(bugId));
    }
}
