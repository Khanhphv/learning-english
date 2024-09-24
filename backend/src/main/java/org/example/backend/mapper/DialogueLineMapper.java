package org.example.backend.mapper;

import org.example.backend.dto.response.DialogueLineResponse;
import org.example.backend.entity.DialogueLine;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DialogueLineMapper {

    DialogueLineResponse toDialogueLineResponse(DialogueLine dialogueLine);
}
