package org.example.backend.repository;

import lombok.Getter;
import org.example.backend.entity.Result;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ResultRepository extends MongoRepository<Result, String> {
}
