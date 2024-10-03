package org.example.backend.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.DBRef;
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
@Document(collection = "quiz_questions")
public class QuizQuestion {

    @MongoId
    @Builder.Default
    String id = UUID.randomUUID().toString();

    @DBRef
    Vocabulary vocabulary;
    List<Option> options;
    String userAnswerId;
    boolean isCorrect;
    boolean isAnswered;
    QuestionType questionType;

}
