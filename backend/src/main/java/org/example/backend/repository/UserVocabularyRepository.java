package org.example.backend.repository;

import org.example.backend.entity.UserVocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserVocabularyRepository  extends MongoRepository<UserVocabulary, String> {
    Optional<UserVocabulary> findByUserIdAndVocabularyId(String userId, String vocabularyId);

}
