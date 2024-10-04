package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Option;
import org.example.backend.entity.QuestionType;
import org.example.backend.entity.QuizQuestion;
import org.example.backend.entity.Vocabulary;
import org.example.backend.exception.ErrorCode;
import org.example.backend.repository.VocabularyRepository;
import org.example.backend.exception.ApplicationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class QuizServiceImp implements QuizService{

    private final VocabularyRepository vocabularyRepository;

    @Override
    public List<QuizQuestion> generateQuizQuestions(String topicId, int numberOfQuestions) {
        List<Vocabulary> allVocabularies = vocabularyRepository.findAll();

        List<Vocabulary> vocabularies =vocabularyRepository.findAllByTopicId(topicId);
        if (vocabularies.isEmpty()){
            throw new ApplicationException(ErrorCode.NON_VOCABULARY);
        }

        List<QuizQuestion> quizQuestions = new ArrayList<>();

        Random random = new Random();
        for (int i = 0; i < numberOfQuestions; i++){
            Vocabulary vocabulary = vocabularies.get(random.nextInt(vocabularies.size()));
            QuizQuestion quizQuestion = QuizQuestion.builder()
                    .vocabulary(vocabulary)
                    .questionType(getRandomQuestionType())
                    .build();
            List<Option> options = generateOptions(allVocabularies, vocabulary, quizQuestion.getQuestionType());
            quizQuestion.setOptions(options);
            quizQuestions.add(quizQuestion);
        }

        return quizQuestions;
    }



    private List<Option> generateOptions(List<Vocabulary> vocabularies, Vocabulary vocabulary, QuestionType questionType){
        List<Option> options = new ArrayList<>();

        String correctAnswer = generateAnswer(vocabulary, questionType);
        options.add(Option.builder()
                .answer(correctAnswer)
                .vocabularyId(vocabulary.getId())
                .isCorrect(true)
                .build());

        while (options.size() < 4 && questionType != QuestionType.SPEAK){
            Vocabulary randomVocabulary = vocabularies.get(new Random().nextInt(vocabularies.size()));
            String randomAnswer = generateAnswer(randomVocabulary, questionType);

            if (options.stream().noneMatch(option -> option.getAnswer().equals(randomAnswer))){
                options.add(Option.builder()
                        .answer(randomAnswer)
                        .vocabularyId(randomVocabulary.getId())
                        .isCorrect(false)
                        .build());
            }
        }

        Collections.shuffle(options);
        return options;
    }

    private String generateAnswer(Vocabulary vocabulary, QuestionType questionType){
        return switch (questionType) {
            case MULTIPLE_CHOICE_BASIC -> vocabulary.getVietnameseMeaning();
            case LISTEN, SPEAK -> vocabulary.getEnglishWord();
        };
    }


    private QuestionType getRandomQuestionType(){
        return QuestionType.values()[new Random().nextInt(QuestionType.values().length)];
    }
}
