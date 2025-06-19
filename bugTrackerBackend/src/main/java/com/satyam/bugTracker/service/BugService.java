package com.satyam.bugTracker.service;

import com.satyam.bugTracker.repos.BugRepository;
import com.satyam.bugTracker.repos.ProjectRepository;
import com.satyam.bugTracker.repos.UserRepository;
import com.satyam.bugTracker.enums.BugStatus;
import com.satyam.bugTracker.models.Bug;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BugService {

    private final BugRepository bugRepository;

    public Bug reportBug(Bug bug) {
//        bug.setCreatedAt(LocalDateTime.now());
//        bug.setUpdatedAt(LocalDateTime.now());
        bug.setStatus(BugStatus.OPEN);
        return bugRepository.save(bug);
    }

    public List<Bug> getAllBugs() {
        return bugRepository.findAll();
    }

    public Bug getBugById(Long id) {
        return bugRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bug not found"));
    }
}
