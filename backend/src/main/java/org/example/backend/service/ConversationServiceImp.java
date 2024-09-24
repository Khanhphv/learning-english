package org.example.backend.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.backend.dto.response.ConversationResponse;
import org.example.backend.entity.AgeGroup;
import org.example.backend.entity.Conversation;
import org.example.backend.entity.Topic;
import org.example.backend.mapper.ConversationMapper;
import org.example.backend.repository.ConversationRepository;
import org.example.backend.repository.TopicRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static org.example.backend.utils.ExcelUtil.getCellValue;
import static org.example.backend.utils.ExcelUtil.isRowEmpty;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConversationServiceImp implements ConversationService {
    private final ConversationMapper conversationMapper;

    private final ConversationRepository conversationRepository;
    private final TopicRepository topicRepository;

    @Override
    public void addManyConversations(MultipartFile file) throws IOException {
        log.info("addManyConversations");

        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheet("Conversation");
        Iterator<Row> rows = sheet.iterator();
        List<Conversation> conversations = new ArrayList<>();
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
            String conversationTitle = getCellValue(row.getCell(1));
            String topicTitle = getCellValue(row.getCell(1));
            Topic topic = topicRepository.findByTitle(topicTitle);
            Conversation conversation = Conversation.builder()
                    .title(conversationTitle)
                    .topic(topic)
                    .build();
            conversations.add(conversation);

        }
        conversationRepository.saveAll(conversations);
        workbook.close();



    }

    @Override
    public List<ConversationResponse> getAllConversationsByTopicId(String topicId) {

        List<Conversation> conversations = conversationRepository.findAllByTopic_Id(topicId);
        return conversations.stream().map(conversationMapper::toConversationResponse).toList();
    }


}
