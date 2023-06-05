package com.prepple.api.query.postgres;

import com.prepple.api.model.Question;
import org.hibernate.criterion.DetachedCriteria;

import java.util.Optional;

public class RandomQuestion extends AbstractRandom<Question> {
    public RandomQuestion(DetachedCriteria existingQuery) {
        super(existingQuery);
        setEntity(Question.class);
    }
}
