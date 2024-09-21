package org.example.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DialogueService {
    void addManyDialogues(MultipartFile file) throws IOException;
}
