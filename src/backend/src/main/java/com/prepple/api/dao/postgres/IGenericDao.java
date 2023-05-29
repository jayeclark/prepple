package com.prepple.api.dao.postgres;

import java.io.Serializable;
import java.util.List;

/**
 * Defines a generic interface for the Dao
 * @param <T>
 */
public interface IGenericDao<T extends Serializable> {
    T findOne(String id);

    List<T> findAll();

    T create(T entity);

    T update(T entity);

    void delete(T entity);

    void deleteById(String entityId);
}
