package com.prepple.api.service;

import com.prepple.api.dao.postgres.QuestionDao;
import com.prepple.api.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionService implements IGenericService<Question> {

    @Autowired
    QuestionDao dao;

    // TODO: Implement randomization with and without replacement based on session store
    public Question getRandom() {
        List<Question> questions = dao.findAll();
        return questions.get(0);
    }

    @Override
    public Question create(Question question) {
        Question result = dao.create(question);
        return result;
    }

    @Override
    public Question getById(String questionID) {
        Question result = dao.findOne(questionID);
        return result;
    }

    @Override
    public void update(Question question) {
        dao.update(question);
    }

    @Override
    public void deleteById(String questionID) {
        dao.deleteById(questionID);
    }
}
