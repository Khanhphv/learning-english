package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.backend.dto.response.DialogueLineResponse;
import org.example.backend.entity.Conversation;
import org.example.backend.entity.DialogueLine;
import org.example.backend.entity.Topic;
import org.example.backend.mapper.DialogueLineMapper;
import org.example.backend.repository.ConversationRepository;
import org.example.backend.repository.DialogueLineRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import static org.example.backend.utils.ExcelUtil.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class DialogueServiceImp implements DialogueService {
    private final DialogueLineMapper dialogueLineMapper;

    private final DialogueLineRepository dialogueLineRepository;
    private final ConversationRepository conversationRepository;

    @Override
    public void addManyDialogues(MultipartFile file) throws IOException {
        log.info("addManyConversations");

        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheet("Dialogue");
        Iterator<Row> rows = sheet.iterator();
        List<DialogueLine> dialogueLines = new ArrayList<>();
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
            String conversationTitle = getMergedCellValue(sheet,row.getCell(0));
            String speaker = getCellValue(row.getCell(1));
            String english = getCellValue(row.getCell(2));
            String vietnamese = getCellValue(row.getCell(3));
            Conversation conversation = conversationRepository.findByTitle(conversationTitle);
            DialogueLine dialogueLine = DialogueLine.builder()
                    .speaker(speaker)
                    .englishSentence(english)
                    .vietnameseSentence(vietnamese)
                    .conversationId(conversation.getId())
                    .build();
            dialogueLines.add(dialogueLine);
        }
        dialogueLineRepository.saveAll(dialogueLines);
        workbook.close();
    }

    @Override
    public List<DialogueLineResponse> getAllDialoguesByConversationId(String conversationId) {
        List<DialogueLine> dialogueLines = dialogueLineRepository.findAllByConversationId(conversationId);

        return dialogueLines.stream().map(dialogueLineMapper::toDialogueLineResponse).toList();
    }

    @Override
    public DialogueLineResponse findByEnglishSentenceIsLike(String englishSentence) {
        return dialogueLineMapper.toDialogueLineResponse(dialogueLineRepository.findFirstByEnglishSentenceRegex( englishSentence));
    }
}
