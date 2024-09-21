package org.example.backend.entity;


import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.UUID;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(collection = "vocabularies")
public class Vocabulary {

    @MongoId
    @Builder.Default
    String id = UUID.randomUUID().toString();
    String englishWord;
    String vietnameseMeaning;
    String topicId;

}
