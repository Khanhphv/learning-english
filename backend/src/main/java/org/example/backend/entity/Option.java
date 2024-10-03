package org.example.backend.entity;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Option {
    private String vocabularyId;
    private String answer;
    private boolean isCorrect;
}
