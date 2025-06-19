package com.satyam.bugTracker.service;

import com.satyam.bugTracker.models.Project;
import com.satyam.bugTracker.repos.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> deleteById(Long id) {
       Optional<Project> p = projectRepository.findById(id);
        projectRepository.deleteById(id);
        return p;
    }
}
