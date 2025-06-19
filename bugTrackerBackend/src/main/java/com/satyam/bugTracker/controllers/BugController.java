package com.satyam.bugTracker.controllers;

import com.satyam.bugTracker.dtos.BugRequest;
import com.satyam.bugTracker.models.Bug;
import com.satyam.bugTracker.models.Project;
import com.satyam.bugTracker.models.User;
import com.satyam.bugTracker.repos.ProjectRepository;
import com.satyam.bugTracker.repos.UserRepository;
import com.satyam.bugTracker.service.BugService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bugs")
@RequiredArgsConstructor
public class BugController {

    @Autowired
    private BugService bugService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProjectRepository projectRepository;



    @PostMapping
    public ResponseEntity<Bug> reportBug(@RequestBody BugRequest req) {
        User reporter   = userRepository.getReferenceById(req.reporterId());   // or findById + orElseThrow
        User assignee   = userRepository.getReferenceById(req.assignedToId());
        Project project = projectRepository.getReferenceById(req.projectId());

//        User reporter = userRepository.findById(req.reporterId()).orElse(null);
//        User assignee = userRepository.findById(req.assignedToId()).orElse(null);
//        Project project = projectRepository.findById(req.projectId()).orElse(null);

        Bug bug = new Bug();
        bug.setTitle(req.title());
        bug.setDescription(req.description());
        bug.setStatus(req.status());
        bug.setReporter(reporter);
        bug.setAssignedTo(assignee);
        bug.setProject(project);
        return ResponseEntity.ok(bugService.reportBug(bug));
    }

    @GetMapping
    public ResponseEntity<List<Bug>> getAllBugs() {
        return ResponseEntity.ok(bugService.getAllBugs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bug> getBug(@PathVariable Long id) {
        return ResponseEntity.ok(bugService.getBugById(id));
    }
}
