package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.backend.entity.AgeGroup;
import org.example.backend.entity.Topic;
import org.example.backend.entity.Vocabulary;
import org.example.backend.repository.AgeGroupRepository;
import org.example.backend.repository.TopicRepository;
import org.example.backend.repository.VocabularyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import static org.example.backend.utils.ExcelUtil.getCellValue;
import static org.example.backend.utils.ExcelUtil.isRowEmpty;

@Service
@RequiredArgsConstructor
@Slf4j
public class TopicServiceImp implements TopicService {

    private final TopicRepository topicRepository;
    private final AgeGroupRepository ageGroupRepository;
    private final VocabularyRepository vocabularyRepository;

    @Override
    public void importExcelToTopic(MultipartFile file) throws IOException {
        List<Vocabulary> vocabularies = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);
        Iterator<Row> rows = sheet.iterator();

        int startRow = 15;
        int currentRow = 0;


        while (rows.hasNext()) {
            Row row = rows.next();

            if (currentRow < startRow) {
                currentRow++;
                continue;
            }


            if (isRowEmpty(row)) {
                log.info("Empty row found at row {}, stopping import.", currentRow + 1);
                break;
            }

            String topictitle = "";


            if (row.getCell(1) != null && row.getCell(1).getCellType() == CellType.STRING) {
                topictitle = row.getCell(1).getStringCellValue();
                log.info("Processing topic: {}", topictitle);
            } else {
                log.error("Invalid data in topic column, row: {}", currentRow + 1);
                continue;
            }

            // Find the corresponding AgeGroup entity based on age
            Topic topic = topicRepository.findByTitle(topictitle);
            if (topic == null) {
                log.error("Cannot find age group for age: {}", topictitle);
                throw new RuntimeException("Cannot find age group for age: " + topictitle);
            }


            String engValue = row.getCell(2).getStringCellValue();
            List<String> wordsListEn = new ArrayList<>();
            Arrays.stream(engValue.split(","))
                    .forEach(word -> wordsListEn.add(word.trim()));
            String[] englishWords = wordsListEn.toArray(new String[0]);
            log.info(englishWords[0] +" " + englishWords[englishWords.length-1]);
            String vnValue = row.getCell(8).getStringCellValue();
            List<String> wordsListVn = new ArrayList<>();
            Arrays.stream(vnValue.split(","))
                    .forEach(word -> wordsListVn.add(word.trim()));
            String[] vietnamWords = wordsListVn.toArray(new String[0]);
            for (int i = 0; i < englishWords.length; i++){
                Vocabulary vocabulary = Vocabulary.builder()
                        .topicId(topic.getId())
                        .englishWord(englishWords[i])
                        .vietnameseMeaning(vietnamWords[i])
                        .build();
                vocabularies.add(vocabulary);
            }

            currentRow++;
        }

        vocabularyRepository.saveAll(vocabularies);



        workbook.close();
    }

    @Override
    public void addManyTopics(MultipartFile file) throws IOException {
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(1);
        Iterator<Row> rows = sheet.iterator();
        List<Topic> topics = new ArrayList<>();
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
            String title = getCellValue(row.getCell(1));
            String ageGroupName = getCellValue(row.getCell(0));
            AgeGroup ageGroup = ageGroupRepository.findByName(ageGroupName);
            Topic topic = Topic.builder()
                    .title(title)
                    .ageGroupId(ageGroup.getId())
                    .build();
            topics.add(topic);
        }
        topicRepository.saveAll(topics);
        workbook.close();
    }



}
