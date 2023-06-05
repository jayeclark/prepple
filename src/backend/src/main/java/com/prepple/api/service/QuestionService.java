package com.prepple.api.service;

import com.prepple.api.dao.postgres.QuestionDao;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Service implementation for the Question entity.
 */
@Component
public class QuestionService implements IGenericService<Question> {

    @Autowired
    QuestionDao dao;


    /**
     * Method to get a list of random questions when maxResults and urnsToExclude are both provided in
     * the function call (they may be null)
     * @return List<QuestionDto>
     */
    public List<QuestionDto> getRandom(Integer maxResults, List<String> urnsToExclude) {
        List<Question> questions = maxResults ==  null ? Collections.singletonList(dao.findOneRandom(urnsToExclude)) : dao.findXRandom(maxResults, urnsToExclude);
        return mapQuestionsToQuestionDtoList(questions);
    }

    @Override
    public QuestionDto create(Question question) {
        Question result = dao.create(question);
        return mapQuestionToQuestionDto(result);
    }

    @Override
    public QuestionDto getById(long questionID) {
        Question result = dao.findOne(questionID);
        return mapQuestionToQuestionDto(result);
    }

    @Override
    public QuestionDto getByUrn(String questionUrn) {
        Question result = dao.findOne(questionUrn);
        return mapQuestionToQuestionDto(result);
    }

    @Override
    public void update(Question question) {
        dao.update(question);
    }

    @Override
    public void deleteById(long questionId) {
        dao.deleteById(questionId);
    }

    @Override
    public void deleteByUrn(String questionUrn) {
        dao.deleteByUrn(questionUrn);
    }

    /**
     * Converts question entity returned by Dao into a safe Dto object
     * @param question Question The question object to convert
     * @return QuestionDto A simplified data transfer object to avoid exposing business logic
     */
    public static QuestionDto mapQuestionToQuestionDto(Question question) {
        Question parent = question.getParent();

        QuestionDto result = QuestionDto.builder()
                .id(question.getId() == null ? 0 : question.getId())
                .urn(question.getUrn())
                .title(question.getTitle())
                .question(question.getQuestion())
                .parentId(parent != null ? parent.getId() : null)
                .acceptance(question.getAcceptance())
                .frequency(question.getFrequency())
                .variation(question.getVariation())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt() != null ? question.getUpdatedAt() : null)
                .build();
        return result;
    }

    /**
     * Converts question entity returned by Dao into a safe Dto object
     * @param questions Question The list of questions to convert
     * @return List<QuestionDto> A list containing simplified data transfer objects to avoid exposing business logic
     */
    public static List<QuestionDto> mapQuestionsToQuestionDtoList(List<Question> questions) {
        List<QuestionDto> result = new ArrayList<>();
        questions.stream().forEach(question -> result.add(mapQuestionToQuestionDto(question)));
        return result;
    }
}
