package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.request.AddAgeGroupRequest;
import org.example.backend.entity.AgeGroup;
import org.example.backend.mapper.AgeGroupMapper;
import org.example.backend.repository.AgeGroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AgeGroupServiceImp implements AgeGroupService {

    private final AgeGroupRepository ageGroupRepository;
    private final AgeGroupMapper ageGroupMapper;
    @Override
    public AgeGroup addAgeGroup(AddAgeGroupRequest addAgeGroupRequest) {
        AgeGroup ageGroup = ageGroupMapper.toAgeGroup(addAgeGroupRequest);
        return ageGroupRepository.save(ageGroup);
    }

    @Override
    public List<AgeGroup> getAllAgeGroups() {

        return ageGroupRepository.findAll();
    }
}
