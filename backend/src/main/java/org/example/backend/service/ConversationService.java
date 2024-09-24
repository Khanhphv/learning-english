package org.example.backend.service;

import org.example.backend.dto.response.ConversationResponse;
import org.example.backend.entity.Conversation;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ConversationService {
    void addManyConversations(MultipartFile file) throws IOException;
    List<ConversationResponse> getAllConversationsByTopicId(String topicId);




}
