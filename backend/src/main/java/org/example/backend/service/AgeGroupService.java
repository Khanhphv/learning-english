package org.example.backend.service;

import org.example.backend.dto.request.AddAgeGroupRequest;
import org.example.backend.entity.AgeGroup;

public interface AgeGroupService {

    AgeGroup addAgeGroup(AddAgeGroupRequest addAgeGroupRequest);
}
