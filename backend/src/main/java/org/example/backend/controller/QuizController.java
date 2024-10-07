package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ApiResponse;
import org.example.backend.entity.QuizQuestion;
import org.example.backend.service.QuizService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {
    private static final Logger log = LoggerFactory.getLogger(QuizController.class);
    private final QuizService quizService;

    @GetMapping("/random")
    public ApiResponse<List<QuizQuestion>> generateQuizQuestions(@RequestParam String topicId, @RequestParam(defaultValue = "20") int numberOfQuestions){

        return ApiResponse.<List<QuizQuestion>>builder()
                .result(quizService.generateQuizQuestions(topicId, numberOfQuestions))
                .build();
    }



    @PostMapping("/submit")
    public ApiResponse<Object> submitQuiz(@RequestBody List<QuizQuestion> quizQuestions){
        try{
            quizService.submitQuiz(quizQuestions);
        }catch (Exception e){
            log.info("Error occurred while submitting quiz", e);
        }


        return ApiResponse.builder()
                .message("Quiz submitted successfully")
                .build();
    }
}
