package com.prepple.api.query.postgres;

import com.prepple.api.model.questions.Question;
import org.hibernate.criterion.DetachedCriteria;

/**
 * Specific implementation of AbstractRandom to retrieve random questions
 */
public class RandomQuestion extends AbstractRandom<Question> {
    /**
     * Calls super constructor from abstract class and sets the entity for the instance as Question
     * @param existingQuery The existing query to attach to the instance
     */
    public RandomQuestion(DetachedCriteria existingQuery) {
        super(existingQuery);
        setEntity(Question.class);
    }
}
