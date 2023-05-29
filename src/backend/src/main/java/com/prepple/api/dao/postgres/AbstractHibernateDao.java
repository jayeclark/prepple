package com.prepple.api.dao.postgres;


import com.google.common.base.Preconditions;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;

/**
 * Defines an abstract Dao class that can be extended to different entities within the data model
 * @param <T> The specific entity type for which the Dao will be instantiated
 */
public abstract class AbstractHibernateDao<T extends Serializable> {
    private Class<T> entity; // skipcq: JAVA-S1060

    @Autowired
    protected SessionFactory sessionFactory;

    public final void setEntity(final Class<T> classToSet) {
        entity = Preconditions.checkNotNull(classToSet);
    }

    // API
    public T findOne(final String id) {
        return (T) getCurrentSession().get(entity, id);
    }

    public List<T> findAll() {
        return getCurrentSession().createQuery("from " + entity.getName()).list();
    }

    public T create(final T entity) {
        Preconditions.checkNotNull(entity);
        getCurrentSession().saveOrUpdate(entity);
        return entity;
    }

    public T update(final T entity) {
        Preconditions.checkNotNull(entity);
        return (T) getCurrentSession().merge(entity);
    }

    public void delete(final T entity) {
        Preconditions.checkNotNull(entity);
        getCurrentSession().delete(entity);
    }

    public void deleteById(final String entityId) {
        final T entity = findOne(entityId);
        Preconditions.checkNotNull(entity);
        delete(entity);
    }

    protected Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }
}