package org.example.backend.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.service.ConversationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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


}
