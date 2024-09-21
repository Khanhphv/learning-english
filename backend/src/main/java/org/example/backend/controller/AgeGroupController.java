package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.AddAgeGroupRequest;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.entity.AgeGroup;
import org.example.backend.service.AgeGroupService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/age-group")
public class AgeGroupController {

    private final AgeGroupService ageGroupService;

    @PostMapping("/add")
    public ApiResponse<AgeGroup> addAgeGroup(@RequestBody AddAgeGroupRequest addAgeGroupRequest) {

        AgeGroup ageGroup = ageGroupService.addAgeGroup(addAgeGroupRequest);

        return ApiResponse.<AgeGroup>builder()
                .result(ageGroup)
                .build();
    }
}
