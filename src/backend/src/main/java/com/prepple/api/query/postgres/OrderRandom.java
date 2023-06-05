package com.prepple.api.query.postgres;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaQuery;
import org.hibernate.criterion.Order;

public class OrderRandom extends Order {
    public OrderRandom() {
        super("", false);
    }

    @Override
    public String toSqlString(Criteria criteria, CriteriaQuery criteriaQuery) {
        return "RANDOM()";
    }
}
