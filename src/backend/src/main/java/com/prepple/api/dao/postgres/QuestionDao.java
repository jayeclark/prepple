package com.prepple.api.dao.postgres;

import com.prepple.api.model.Question;
import org.springframework.stereotype.Repository;

/**
 * Dao implementation for Question entity
 */
@Repository
public class QuestionDao extends AbstractHibernateDao<Question> implements IGenericDao<Question> {
    /**
     * Sets the Dao to relate to the Question entity
     */
    public QuestionDao(){
        setEntity(Question.class);
    }
}
