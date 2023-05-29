package com.prepple.api.service;

import com.prepple.api.dto.IGenericDto;

import java.io.Serializable;

/**
 * Interface for generic entity services. Individual entities will implement
 * different versions of these methods based on additional data store operation
 * requirements or event emitters
 * @param <T> The type of entity for which the service is being defined
 */
public interface IGenericService<T extends Serializable> {
    public IGenericDto<T> create(T entity);
    public IGenericDto<T> getById(String id);
    public void update(T entity);
    public void deleteById(String id);
}
