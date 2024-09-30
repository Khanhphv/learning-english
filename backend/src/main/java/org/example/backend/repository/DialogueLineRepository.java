package org.example.backend.repository;

import org.example.backend.entity.DialogueLine;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DialogueLineRepository extends MongoRepository<DialogueLine, String> {
    List<DialogueLine> findAllByConversationId(String conversationId);

    DialogueLine findFirstByEnglishSentenceRegex(String englishSentence);
}
