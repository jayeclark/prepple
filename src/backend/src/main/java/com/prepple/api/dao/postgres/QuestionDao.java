package com.prepple.api.dao.postgres;

import com.prepple.api.model.Question;
import com.prepple.api.query.postgres.OrderRandom;
import com.prepple.api.query.postgres.RandomQuestion;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    /**
     * Retrieves a single random question
     * @param idsToExclude Question ids to exclude from the search
     * @return A single question object
     */
    public Question findOneRandom(List<String> idsToExclude) {
        return findXRandom(1, idsToExclude).get(0);
    }

    /**
     * Retr
     * @param x
     * @param idsToExclude
     * @return
     */
    public List<Question> findXRandom(Integer x, List<String> idsToExclude) {
        DetachedCriteria query = DetachedCriteria.forClass(Question.class);
        OrderRandom ORDER_RANDOM = new OrderRandom();
        query.addOrder(ORDER_RANDOM);
        query = new RandomQuestion(query).getQuery(idsToExclude);

        return query.getExecutableCriteria(getCurrentSession()).setMaxResults(x).list();
    }
}
