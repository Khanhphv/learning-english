package org.example.backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;



@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TopicResponse {

    String id;
    String title;
    boolean favourite;
}
