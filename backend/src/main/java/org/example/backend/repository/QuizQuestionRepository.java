package org.example.backend.repository;

import org.example.backend.entity.QuizQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizQuestionRepository extends MongoRepository<QuizQuestion, String> {
}
