package org.example.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ConversationService {
    void addManyConversations(MultipartFile file) throws IOException;



}
