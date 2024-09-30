package org.example.backend.service;

import org.example.backend.dto.response.VocabularyResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VocabularyService {
    void addManyVocaubularyFromExcel(MultipartFile file) throws IOException;
    long countVocabularyByAgeGroupId(String ageGroupId);
    List<VocabularyResponse> findAllVocabularyByTopicId(String topicId);
}
