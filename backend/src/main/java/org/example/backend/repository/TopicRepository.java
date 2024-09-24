package org.example.backend.repository;

import org.example.backend.entity.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
    Topic findByTitle(String title);
    int countByAgeGroupId(String ageGroupId);
    List<Topic> findByAgeGroupId(String ageGroupId);
}
