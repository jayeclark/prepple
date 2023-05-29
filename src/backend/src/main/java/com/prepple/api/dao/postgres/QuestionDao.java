package com.prepple.api.dao.postgres;

import com.prepple.api.model.Question;
import org.springframework.stereotype.Repository;

/**
 * Dao implementation for Question entity
 */
@Repository
public class QuestionDao extends AbstractHibernateDao<Question> implements IGenericDao<Question> {
    public QuestionDao(){
        setEntity(Question.class);
    }
}
