package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.AddAgeGroupRequest;
import org.example.backend.dto.ApiResponse;
import org.example.backend.entity.AgeGroup;
import org.example.backend.service.AgeGroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ApiResponse<List<AgeGroup>> getAllAgeGroups() {
        List<AgeGroup> ageGroups = ageGroupService.getAllAgeGroups();

        return ApiResponse.<List<AgeGroup>>builder()
                .result(ageGroups)
                .build();
    }


    @GetMapping("/{age-group-id}")
    public ApiResponse<AgeGroup> getAgeGroupById(@PathVariable("age-group-id") String ageGroupId) {
        AgeGroup ageGroup = ageGroupService.getAgeGroupById(ageGroupId);

        return ApiResponse.<AgeGroup>builder()
                .result(ageGroup)
                .build();
    }
}
