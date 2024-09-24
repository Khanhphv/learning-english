package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.ApiResponse;
import org.example.backend.dto.response.TopicResponse;
import org.example.backend.entity.Topic;
import org.example.backend.service.TopicService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topic")
@RequiredArgsConstructor
@Slf4j
public class TopicController {
    private final TopicService topicService;

    @PostMapping("/add")
    public ApiResponse<?> importTopicFromExcel(@RequestParam("file")MultipartFile file){
        try {
            topicService.addManyTopics(file);
        }catch (Exception e){
            log.info(e.getMessage());
        }

        return ApiResponse.builder().build();
    }

    @GetMapping("/count/{age-group-id}")
    public ApiResponse<Integer> countTopicByAgeGroupId(@PathVariable("age-group-id") String ageGroupId){
        return ApiResponse.<Integer>builder()
                .result(topicService.countTopicByAgeGroupId(ageGroupId))
                .build();
    }


    @GetMapping("/{age-group-id}")
    public ApiResponse<List<TopicResponse>> getAllTopicsByAgeGroupId(@PathVariable("age-group-id") String ageGroupId){
        return ApiResponse.<List<TopicResponse>>builder()
                .result(topicService.getAllTopicsByAgeGroupId(ageGroupId))
                .build();
    }


    @PutMapping("/update-favourite/{topic-id}")
    public ApiResponse<?> updateFavourite(@PathVariable("topic-id") String topicId){
        topicService.updateFavourite(topicId);
        return ApiResponse.builder().build();
    }


    @GetMapping("/info/{topic-id}")
    public ApiResponse<TopicResponse> getTopicInfo(@PathVariable("topic-id") String topicId){
        return ApiResponse.<TopicResponse>builder()
                .result(topicService.getTopicInfo(topicId))
                .build();
    }
}
