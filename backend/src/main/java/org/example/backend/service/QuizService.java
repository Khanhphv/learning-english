package org.example.backend.service;

import org.example.backend.entity.QuizQuestion;

import java.util.List;

public interface QuizService {
    List<QuizQuestion> generateQuizQuestions(String topicId, int numberOfQuestions);
    void submitQuiz(List<QuizQuestion> quizQuestions);

}
