package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.ApiResponse;
import org.example.backend.dto.response.DialogueLineResponse;
import org.example.backend.service.DialogueService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/dialogue")
public class DialogueController {

    private final DialogueService dialogueService;


    @PostMapping("/add")
    public ApiResponse<Object> addManyDialogues(@RequestParam("file") MultipartFile file){
        try {
            dialogueService.addManyDialogues(file);
        }catch (Exception e){
            log.info(e.getMessage());
            throw new RuntimeException(e);
        }

        return ApiResponse.builder().build();
    }


    @GetMapping("/{conversation-id}")
    public ApiResponse<List<DialogueLineResponse>> getAllDialoguesByConversationId(@PathVariable("conversation-id") String conversationId){
        return ApiResponse.<List<DialogueLineResponse>>builder().result(dialogueService.getAllDialoguesByConversationId(conversationId)).build();
    }

    @GetMapping("/find-by-english-sentence/{english-sentence}")
    public ApiResponse<DialogueLineResponse> findByEnglishSentenceIsLike(@PathVariable("english-sentence") String englishSentence){
        return ApiResponse.<DialogueLineResponse>builder().result(dialogueService.findByEnglishSentenceIsLike(englishSentence)).build();
    }
}
