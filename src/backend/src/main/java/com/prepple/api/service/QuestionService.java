package com.prepple.api.service;

import com.prepple.api.dao.postgres.QuestionDao;
import com.prepple.api.dto.QuestionDto;
import com.prepple.api.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Service implementation for the Question entity.
 */
@Component
public class QuestionService implements IGenericService<Question> {

    @Autowired
    QuestionDao dao;

    // TODO: Implement randomization with and without replacement based on session store
    public QuestionDto getRandom() {
        List<Question> questions = dao.findAll();
        return mapQuestionToQuestionDto(questions.get(0));
    }

    @Override
    public QuestionDto create(Question question) {
        Question result = dao.create(question);
        return mapQuestionToQuestionDto(result);
    }

    @Override
    public QuestionDto getById(String questionID) {
        Question result = dao.findOne(questionID);
        return mapQuestionToQuestionDto(result);
    }

    @Override
    public void update(Question question) {
        dao.update(question);
    }

    @Override
    public void deleteById(String questionID) {
        dao.deleteById(questionID);
    }

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
}
