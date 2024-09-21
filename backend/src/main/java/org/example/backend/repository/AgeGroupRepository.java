package org.example.backend.repository;

import org.example.backend.entity.AgeGroup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgeGroupRepository extends MongoRepository<AgeGroup, String> {
    AgeGroup findByName(String name);
}
