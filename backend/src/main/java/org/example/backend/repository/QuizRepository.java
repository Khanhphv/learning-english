package org.example.backend.repository;

import org.example.backend.entity.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository  extends MongoRepository<Quiz, String> {
}
