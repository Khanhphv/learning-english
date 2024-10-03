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
    TOPIC_NOT_FOUND(1001, "Topic not found"),
    USER_NOT_FOUND(1002, "User not found"),
    USERNAME_INVALID(1003, "Username invalid"),
    PASSWORD_TOO_SHORT(1004, "Password too short"),
    PASSWORD_INVALID(1005, "Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character"),
    INVALID_TOKEN(1006, "Invalid token"),
    USER_ALREADY_EXISTS(1007, "User already exists"),
    NON_VOCABULARY(1008, "Non vocabulary"),
    INVALID_QUESTION_TYPE(1009, "Invalid question type when generating" );
    final int code;
    final String message;
}
