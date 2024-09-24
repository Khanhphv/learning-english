package org.example.backend.repository;

import org.example.backend.entity.Vocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {

    @Query(value = "{topicId: {$in:  ?0}}", count = true)
    long countByTopicIds(List<String> topicIds);
}
