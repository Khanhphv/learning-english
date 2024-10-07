package org.example.backend.service;

import org.example.backend.dto.response.LearnVocabularyResponse;
import org.example.backend.dto.response.VocabularyResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VocabularyService {
    void addManyVocabularyFromExcel(MultipartFile file) throws IOException;
    long countVocabularyByAgeGroupId(String ageGroupId);
    List<VocabularyResponse> findAllVocabularyByTopicId(String topicId);
    List<LearnVocabularyResponse> findAllVocabularyByTopicIdAndLearningStatus(String topicId);
}
