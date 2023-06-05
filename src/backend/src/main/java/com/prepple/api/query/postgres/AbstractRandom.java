package com.prepple.api.query.postgres;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * Abstract class for defining queries to retrieve random sets of entities from the data store
 * @param <T>
 */

public abstract class AbstractRandom<T> {
    private Class clazz;
    private final DetachedCriteria existingQuery;

    /**
     * Constructor for abstract random query class
     * @param existingQuery An existing query that can be passed to the class
     */
    public AbstractRandom(DetachedCriteria existingQuery) {
        this.existingQuery = existingQuery;
    }

    /**
     * Sets the entity that the abstract random query will relate to
     * @param clazz The class for which the query class is being instantiated
     */
    public void setEntity(Class clazz) {
        this.clazz = clazz;
    }

    // TODO: Move random ordering definition to this method?
    /**
     * Retrieves a query that will restrict the results to not include specific IDs
     * @param idsToExclude The ids to exclude from the results
     * @return DetachedCriteria The query that can be used to retrieve the random entitites
     */
    public DetachedCriteria getQuery(List<String> idsToExclude) {

        DetachedCriteria query = existingQuery != null ? existingQuery : DetachedCriteria.forClass(clazz);
        if (idsToExclude != null && idsToExclude.size() > 0) {
            idsToExclude.stream()
                    .forEach(id -> query.add(Restrictions.not(Restrictions.eq("id", id))));
        }
        return query;
    }
}
