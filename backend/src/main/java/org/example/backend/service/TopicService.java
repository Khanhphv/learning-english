package org.example.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface TopicService {
    void importExcelToTopic(MultipartFile file) throws IOException;
    void addManyTopics(MultipartFile file) throws IOException;

}
