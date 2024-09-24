package org.example.backend.mapper;

import org.example.backend.dto.response.ConversationResponse;
import org.example.backend.entity.Conversation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConversationMapper {

    ConversationResponse toConversationResponse(Conversation conversation);
}
