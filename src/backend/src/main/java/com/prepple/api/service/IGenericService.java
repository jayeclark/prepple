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
    /**
     * A service should include a method to create a new entity and return
     * a Dto
     * @param entity <T>
     * @return IGenericDto<T>
     */
    public IGenericDto<T> create(T entity);

    /**
     * A service should include a method to get an entity by its id
     * @param id long
     * @return IGenericDto<T>
     */
    public IGenericDto<T> getById(long id);

    /**
     * A service should include a method to get an entity by its urn
     * @param urn String
     * @return IGenericDto<T>
     */
    public IGenericDto<T> getByUrn(String urn);

    /**
     * A service should include a method to update an entity
     * @param entity <T>
     */
    public void update(T entity);

    /**
     * A service should include a method to delete an entity based on its id
     * @param id String
     */
    public void deleteById(long id);

    public void deleteByUrn(String id);
}
