package org.example.backend.service;

import org.example.backend.dto.response.DialogueLineResponse;
import org.example.backend.entity.DialogueLine;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DialogueService {
    void addManyDialogues(MultipartFile file) throws IOException;
    List<DialogueLineResponse> getAllDialoguesByConversationId(String conversationId);
    DialogueLineResponse findByEnglishSentenceIsLike(String englishSentence);
}
