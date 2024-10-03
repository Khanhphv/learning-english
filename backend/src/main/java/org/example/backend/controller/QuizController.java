package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ApiResponse;
import org.example.backend.entity.QuizQuestion;
import org.example.backend.service.QuizService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @GetMapping("/random")
    public ApiResponse<List<QuizQuestion>> generateQuizQuestions(@RequestParam String topicId, @RequestParam(defaultValue = "20") int numberOfQuestions){

        return ApiResponse.<List<QuizQuestion>>builder()
                .result(quizService.generateQuizQuestions(topicId, numberOfQuestions))
                .build();
    }

}
