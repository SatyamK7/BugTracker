package com.satyam.bugTracker.service;

import com.satyam.bugTracker.repos.BugRepository;
import com.satyam.bugTracker.enums.BugStatus;
import com.satyam.bugTracker.models.Bug;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

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

    public Bug updateBug(Bug bug) {

        return bugRepository.save(bug);
    }

    public void deleteById(Long id) {
        bugRepository.deleteById(id);
    }
}
