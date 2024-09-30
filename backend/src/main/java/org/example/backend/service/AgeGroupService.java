package org.example.backend.service;

import org.example.backend.dto.request.AddAgeGroupRequest;
import org.example.backend.entity.AgeGroup;

import java.util.List;

public interface AgeGroupService {

    AgeGroup addAgeGroup(AddAgeGroupRequest addAgeGroupRequest);
    List<AgeGroup> getAllAgeGroups();
    AgeGroup getAgeGroupById(String ageGroupId);
}
