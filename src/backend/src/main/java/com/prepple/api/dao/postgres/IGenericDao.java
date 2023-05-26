package com.prepple.api.dao.postgres;

import java.io.Serializable;
import java.util.List;

public interface IGenericDao<T extends Serializable> {
    T findOne(long id);

    List<T> findAll();

    T create(T entity);

    T update(T entity);

    void delete(T entity);

    void deleteById(long entityId);
}
