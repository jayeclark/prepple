package com.prepple.api.dao.postgres;

import com.prepple.api.model.questions.Question;
import com.prepple.api.query.postgres.OrderRandom;
import com.prepple.api.query.postgres.RandomQuestion;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public Question findOneRandom(List<String> idsToExclude) { // skipcq: JAVA-S1066
        return findXRandom(1, idsToExclude).get(0);
    }

    /**
     * Retrieves multiple random questions
     * @param x Number of random questions to retrieve
     * @param urnsToExclude Urns that should be excluded from the returned results
     * @return
     */
    public List<Question> findXRandom(Integer x, List<String> urnsToExclude) {
        DetachedCriteria query = DetachedCriteria.forClass(Question.class);
        OrderRandom ORDER_RANDOM = new OrderRandom();
        query.addOrder(ORDER_RANDOM);
        query = new RandomQuestion(query).getQuery(urnsToExclude);

        return query.getExecutableCriteria(getCurrentSession()).setMaxResults(x).list();
    }
}
