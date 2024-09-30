package org.example.backend.repository;


import org.example.backend.entity.InvalidatedToken;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InvalidatedTokenRepository extends MongoRepository<InvalidatedToken, String> {
    boolean existsById(String id);
}
