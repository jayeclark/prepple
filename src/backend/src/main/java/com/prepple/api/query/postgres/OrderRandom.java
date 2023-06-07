package com.prepple.api.query.postgres;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaQuery;
import org.hibernate.criterion.Order;

/**
 * Helper class to order results by random order. Total number of questions will be fewer than
 * 3000 so this sorting step is not expected to add significant latency
 */
public class OrderRandom extends Order {

    /**
     * Constructor for random ordering class
     */
    public OrderRandom() {
        super("", false);
    }

    @Override
    public String toSqlString(Criteria criteria, CriteriaQuery criteriaQuery) {
        return "RANDOM()";
    }
}
