package org.example.backend.mapper;

import org.example.backend.dto.request.RegisterRequest;
import org.example.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUsser(RegisterRequest registerRequest);
}
