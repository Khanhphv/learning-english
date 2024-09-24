package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DialogueLineResponse {
    String id ;
    String speaker;
    String englishSentence;
    String vietnameseSentence;
}
