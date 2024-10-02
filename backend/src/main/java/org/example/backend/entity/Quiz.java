package org.example.backend.entity;


import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "quizzes")
public class Quiz {

    @MongoId
    @Builder.Default
    String id = UUID.randomUUID().toString();

    String userId;
    List<String> questionIds;
    boolean completed;
    QuizType quizType;
}
