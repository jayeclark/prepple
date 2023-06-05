package com.prepple.api.query.postgres;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;
import java.util.Optional;

public abstract class AbstractRandom<T> {
    private Class clazz;
    private final DetachedCriteria existingQuery;

    public AbstractRandom(DetachedCriteria existingQuery) {
        this.existingQuery = existingQuery;
    }

    public void setEntity(Class clazz) {
        this.clazz = clazz;
    }

    public DetachedCriteria getQuery(List<String> idsToExclude) {

        DetachedCriteria query = existingQuery != null ? existingQuery : DetachedCriteria.forClass(clazz);
        if (idsToExclude != null && idsToExclude.size() > 0) {
            idsToExclude.stream()
                    .forEach(id -> query.add(Restrictions.not(Restrictions.eq("id", id))));
        }
        return query;
    }
}
