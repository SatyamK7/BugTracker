package com.satyam.bugTracker.dtos;

import com.satyam.bugTracker.enums.BugStatus;

public record BugRequest(
        String title,
        String description,
        BugStatus status,
        Long reporterId,
        Long assignedToId,
        Long projectId) {}
