package org.example.backend.repository;

import org.example.backend.entity.Vocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {
}
