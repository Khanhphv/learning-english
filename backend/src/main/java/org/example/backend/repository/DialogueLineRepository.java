package org.example.backend.repository;

import org.example.backend.entity.DialogueLine;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DialogueLineRepository extends MongoRepository<DialogueLine, String> {
}
