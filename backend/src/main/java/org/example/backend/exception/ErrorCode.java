package org.example.backend.exception;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNCATEGORIZED(9999, "Uncategorized error"),
    AGE_GROUP_NOT_FOUND(1000, "Age group not found"),
    TOPIC_NOT_FOUND(1001, "Topic not found")

    ;
    final int code;
    final String message;
}
