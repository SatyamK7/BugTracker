package com.satyam.bugTracker.controllers;

import com.satyam.bugTracker.models.Assignment;
import com.satyam.bugTracker.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<Assignment> assignBug(@RequestParam Long bugId, @RequestParam Long userId) {
        return ResponseEntity.ok(assignmentService.assignBug(bugId, userId));
    }

    @GetMapping("/bug/{bugId}")
    public ResponseEntity<List<Assignment>> getAssignmentsForBug(@PathVariable Long bugId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsForBug(bugId));
    }
}
