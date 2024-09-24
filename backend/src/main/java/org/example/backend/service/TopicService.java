package org.example.backend.service;

import org.example.backend.dto.response.TopicResponse;
import org.example.backend.entity.Topic;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TopicService {
    void importExcelToTopic(MultipartFile file) throws IOException;
    void addManyTopics(MultipartFile file) throws IOException;
    int countTopicByAgeGroupId(String ageGroupId);
    List<TopicResponse> getAllTopicsByAgeGroupId(String ageGroupId);
    void updateFavourite(String topicId);
    TopicResponse getTopicInfo(String topicId);
}
