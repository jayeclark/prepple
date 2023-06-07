package com.prepple.api.dao.postgres;


import com.google.common.base.Preconditions;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
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

    /**
     * Generic method for retrieving an entity from the database
     * @param id String The id of the entity to be retrieved
     * @return <T> The entity matching the requested id
     */
    public T findOne(final long id) {
        return (T) getCurrentSession().get(entity, id);
    }

    /**
     * Generic method for retrieving an entity from the database
     * @param urn String The id of the entity to be retrieved
     * @return <T> The entity matching the requested id
     */
    public T findOne(final String urn) {
        DetachedCriteria query = DetachedCriteria.forClass(entity);
        query.add(Restrictions.eq("urn", urn));
        return (T) query.getExecutableCriteria(getCurrentSession()).list();
    }

    /**
     * Generic method for retrieving all of a specific entity from the database
     * @return List<T>  A list of all entities
     */
    public List<T> findAll() {
        return getCurrentSession().createQuery("from " + entity.getName()).list();
    }

    /**
     * Generic method for creating a new entity
     * @param entity <T> The data needed to create the entity
     * @return <T> The entity that was created in the database
     */
    public T create(final T entity) {
        Preconditions.checkNotNull(entity);
        getCurrentSession().saveOrUpdate(entity);
        return entity;
    }

    /**
     * A generic method for updating an entity
     * @param entity <T> The data needed to update the entity
     * @return <T> The entity that was updated, post update
     */
    public T update(final T entity) {
        Preconditions.checkNotNull(entity);
        return (T) getCurrentSession().merge(entity);
    }

    /**
     * A generic method for deleting an entity
     * @param entity <T> The entity to be deleted
     */
    public void delete(final T entity) {
        Preconditions.checkNotNull(entity);
        getCurrentSession().delete(entity);
    }

    /**
     * A generic method for deleting an entity based on its id
     * @param entityId long The id of the entity to be deleted
     */
    public void deleteById(final long entityId) {
        final T entity = findOne(entityId);
        Preconditions.checkNotNull(entity);
        delete(entity);
    }

    /**
     * A generic method for deleting an entity based on its id
     * @param entityUrn String The urn of the entity to be deleted
     */
    public void deleteByUrn(final String entityUrn) {
        final T entity = findOne(entityUrn);
        Preconditions.checkNotNull(entity);
        delete(entity);
    }

    /**
     * Returns the current hibernate session
     * @return Session
     */
    protected Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }
}