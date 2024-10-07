package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.*;
import org.example.backend.exception.ErrorCode;
import org.example.backend.repository.*;
import org.example.backend.exception.ApplicationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class QuizServiceImp implements QuizService{

    private static final Logger log = LoggerFactory.getLogger(QuizServiceImp.class);
    private final VocabularyRepository vocabularyRepository;
    private final QuizRepository quizRepository;
    private final ResultRepository resultRepository;
    private final UserVocabularyRepository userVocabularyRepository;
    private final QuizQuestionRepository quizQuestionRepository;

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

    @Override
    @Transactional
    public void submitQuiz(List<QuizQuestion> quizQuestions) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();


        Quiz quiz = Quiz.builder()
                .quizType(QuizType.RANDOM)
                .completed(true)
                .questionIds(quizQuestions.stream().map(QuizQuestion::getId).toList())
                .userId(user.getId())
                .build();

        quizRepository.save(quiz);
        quizQuestionRepository.saveAll(quizQuestions);
        for (QuizQuestion quizQuestion: quizQuestions){
            log.info("Quiz question: {}", quizQuestion);
        }
        Result result = Result.builder()
                .quizId(quiz.getId())
                .correctAnswersCount(quizQuestions.stream().filter(QuizQuestion::isCorrect).toList().size())
                .numberOfQuestions(quizQuestions.size())
                .isCompleted(true)
                .build();

        resultRepository.save(result);
        updateUserVocabularyProgress(user.getId(), quizQuestions);

    }


    private void updateUserVocabularyProgress(String userId, List<QuizQuestion> quizQuestions){
        for (QuizQuestion quizQuestion: quizQuestions){
            UserVocabulary userVocabulary = userVocabularyRepository.findByUserIdAndVocabularyId(userId, quizQuestion.getVocabulary().getId())
                    .orElseGet(() -> UserVocabulary.builder()
                            .userId(userId)
                            .vocabularyId(quizQuestion.getVocabulary().getId())
                            .correctAnswersCount(0)
                            .learned(false)
                            .build());

            if (quizQuestion.isCorrect()){
                userVocabulary.setCorrectAnswersCount(userVocabulary.getCorrectAnswersCount() + 1);
            }
            if (userVocabulary.getCorrectAnswersCount() >= 3){
                userVocabulary.setLearned(true);
            }
            userVocabularyRepository.save(userVocabulary);
        }
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
