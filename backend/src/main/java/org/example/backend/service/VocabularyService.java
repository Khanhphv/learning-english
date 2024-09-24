package org.example.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface VocabularyService {
    void addManyVocaubularyFromExcel(MultipartFile file) throws IOException;
    long countVocabularyByAgeGroupId(String ageGroupId);
}
