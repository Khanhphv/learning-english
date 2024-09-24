package org.example.backend.mapper;

import org.example.backend.dto.response.TopicResponse;
import org.example.backend.entity.Topic;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TopicMapper {

    TopicResponse toTopicResponse(Topic topic);
}
