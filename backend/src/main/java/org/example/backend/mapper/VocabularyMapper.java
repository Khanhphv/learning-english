package org.example.backend.mapper;

import org.example.backend.dto.response.LearnVocabularyResponse;
import org.example.backend.dto.response.VocabularyResponse;
import org.example.backend.entity.Vocabulary;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VocabularyMapper {

    VocabularyResponse toVocabularyResponse(Vocabulary vocabulary);
    LearnVocabularyResponse toLearnVocabularyResponse(Vocabulary vocabulary);
}
