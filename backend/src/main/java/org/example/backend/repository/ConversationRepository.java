package org.example.backend.repository;

import org.example.backend.entity.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConversationRepository extends MongoRepository<Conversation, String> {
    Conversation findByTitle(String title);

}
