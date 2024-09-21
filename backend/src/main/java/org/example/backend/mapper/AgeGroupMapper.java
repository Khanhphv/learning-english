package org.example.backend.mapper;

import org.example.backend.dto.request.AddAgeGroupRequest;
import org.example.backend.entity.AgeGroup;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AgeGroupMapper {

    AgeGroup toAgeGroup(AddAgeGroupRequest addAgeGroupRequest);
}
