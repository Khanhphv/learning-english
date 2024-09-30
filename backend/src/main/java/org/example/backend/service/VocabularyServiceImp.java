package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.backend.dto.response.VocabularyResponse;
import org.example.backend.entity.AgeGroup;
import org.example.backend.entity.Topic;
import org.example.backend.entity.Vocabulary;
import org.example.backend.mapper.VocabularyMapper;
import org.example.backend.repository.TopicRepository;
import org.example.backend.repository.VocabularyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.example.backend.utils.ExcelUtil.isRowEmpty;

@Service
@RequiredArgsConstructor
@Slf4j
public class VocabularyServiceImp implements VocabularyService{
    private final VocabularyMapper vocabularyMapper;

    private final VocabularyRepository vocabularyRepository;
    private final TopicRepository topicRepository;

    @Override
    public void addManyVocaubularyFromExcel(MultipartFile file) throws IOException {
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheet("Table vocabulary");
        Iterator<Row> rows = sheet.iterator();
        List<Vocabulary> vocabularies = new ArrayList<>();
        int startRow = 1;
        while (rows.hasNext()){
            Row row = rows.next();
            if (isRowEmpty(row)) {
                log.info("Empty row found at row {}, stopping import.");
                break;
            }
            if (row.getRowNum() < startRow) {
                continue;
            }
            String titleTopic = row.getCell(0).getStringCellValue();
            String englishWord = row.getCell(1).getStringCellValue();
            String vietnameseMeaning = row.getCell(2).getStringCellValue();
            Topic topic = topicRepository.findByTitle(titleTopic);
            Vocabulary vocabulary = Vocabulary.builder()
                    .vietnameseMeaning(vietnameseMeaning)
                    .englishWord(englishWord)
                    .topicId(topic.getId())
                    .build();
            vocabularies.add(vocabulary);
        }

        vocabularyRepository.saveAll(vocabularies);
        workbook.close();
    }

    @Override
    public long countVocabularyByAgeGroupId(String ageGroupId) {
        List<String> topicIds = topicRepository.findByAgeGroupId(ageGroupId).stream()
                .map(Topic::getId)
                .toList();

        return vocabularyRepository.countByTopicIds(topicIds);
    }

    @Override
    public List<VocabularyResponse> findAllVocabularyByTopicId(String topicId) {
        List<Vocabulary> vocabularies = vocabularyRepository.findAllByTopicId(topicId);

        return vocabularies.stream().map(vocabularyMapper::toVocabularyResponse).toList();
    }
}
