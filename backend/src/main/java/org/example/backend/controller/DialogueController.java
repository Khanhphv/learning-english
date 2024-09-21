package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dto.response.ApiResponse;
import org.example.backend.service.DialogueService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

}
