package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.ApiResponse;
import org.example.backend.dto.response.LearnVocabularyResponse;
import org.example.backend.dto.response.VocabularyResponse;
import org.example.backend.service.VocabularyService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vocabulary")
@RequiredArgsConstructor
@Slf4j
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @PostMapping("/add")
    public ApiResponse<Object> importVocabularyFromExcel(@RequestParam("file") MultipartFile  file){
        try {
            vocabularyService.addManyVocabularyFromExcel(file);
        }catch (Exception e){
            log.info(e.getMessage());
        }

        return ApiResponse.builder().build();
    }

    @GetMapping("/count/{age-group-id}")
    public ApiResponse<Long> countVocabularyByAgeGroupId(@PathVariable("age-group-id") String ageGroupId){
        return ApiResponse.<Long>builder()
                .result(vocabularyService.countVocabularyByAgeGroupId(ageGroupId))
                .build();
    }


    @GetMapping("/get-by-topic/{topic-id}")
    public ApiResponse<List<VocabularyResponse>> findAllVocabularyByTopicId(@PathVariable("topic-id") String topicId){
        return ApiResponse.<List<VocabularyResponse>>builder()
                .result(vocabularyService.findAllVocabularyByTopicId(topicId))
                .build();
    }

    @GetMapping("/get-by-topic-and-leaning-status/{topic-id}")
    public ApiResponse<List<LearnVocabularyResponse>> findAllVocabularyByTopicIdAndLearningStatus(@PathVariable("topic-id") String topicId){
        return ApiResponse.<List<LearnVocabularyResponse>>builder()
                .result(vocabularyService.findAllVocabularyByTopicIdAndLearningStatus(topicId))
                .build();
    }
}
