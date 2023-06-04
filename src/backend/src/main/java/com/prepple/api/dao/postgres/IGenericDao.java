package com.prepple.api.dao.postgres;

import java.io.Serializable;
import java.util.List;

/**
 * Defines a generic interface for the Dao
 * @param <T>
 */
public interface IGenericDao<T extends Serializable> {
    /**
     * Find one entity based on ID
     * @param id String
     * @return <T>
     */
    T findOne(String id);

    /**
     * Find all entities of a given type
     * @return List<T>
     */
    List<T> findAll();

    /**
     * Create a new entity
     * @param entity <T>
     * @return <T>
     */
    T create(T entity);

    /**
     * Update an entity
     * @param entity <T>
     * @return <T>
     */
    T update(T entity);

    /**
     * Delete an entity
     * @param entity <T>
     */
    void delete(T entity);

    /**
     * Delete an entity based on id
     * @param entityId String
     */
    void deleteById(long entityId);

    void deleteByUrn(String entityUrn);
}
