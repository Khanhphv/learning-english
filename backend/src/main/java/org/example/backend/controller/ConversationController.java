package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.ApiResponse;
import org.example.backend.dto.response.ConversationResponse;
import org.example.backend.entity.Conversation;
import org.example.backend.service.ConversationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/conversation")
@RequiredArgsConstructor
@Slf4j
public class ConversationController {
    private final ConversationService conversationService;

    @PostMapping("/add")
    public ApiResponse<Object> importConversationFromExcel(@RequestParam("file") MultipartFile file){
        try {
            conversationService.addManyConversations(file);
        }catch (Exception e){
            log.info(e.getMessage());
        }

        return ApiResponse.builder().build();
    }

    @GetMapping("/{topic-id}")
    public ApiResponse<List<ConversationResponse>> getAllConversationsByTopicId(@PathVariable("topic-id") String topicId){


        return ApiResponse.<List<ConversationResponse>>builder()
                .result(conversationService.getAllConversationsByTopicId(topicId))
                .build();
    }


}
