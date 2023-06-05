package com.prepple.api.service;

import com.prepple.api.dao.postgres.QuestionDao;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

    /**
     * Overload to get a list of random questions when no urnsToExclude are defined
     * @return List<QuestionDto>
     */
    public List<QuestionDto> getRandom(Integer maxResults) {
        return getRandom(maxResults, null);
    }

    /**
     * Overload to get a list of random questions when no maxResults or urnsToExclude are defined
     * @return List<QuestionDto>
     */
    public List<QuestionDto> getRandom() {
        return getRandom(null);
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

        QuestionDto result = new QuestionDto();
        result.setId(question.getId());
        result.setTitle(question.getTitle());
        result.setQuestion(question.getQuestion());
        result.setParentId(parent != null ? parent.getId() : null);
        result.setAcceptance(question.getAcceptance());
        result.setFrequency(question.getFrequency());
        result.setVariation(question.getVariation());
        result.setCreatedAt(question.getCreatedAt());
        result.setUpdatedAt(question.getUpdatedAt());
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
