package org.example.backend.repository;

import org.example.backend.entity.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConversationRepository extends MongoRepository<Conversation, String> {
    Conversation findByTitle(String title);

    List<Conversation> findAllByTopic_Id(String topicId);

}
