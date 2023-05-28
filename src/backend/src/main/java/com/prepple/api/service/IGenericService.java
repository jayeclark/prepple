package com.prepple.api.service;

import com.prepple.api.dto.IGenericDto;
import com.prepple.api.model.Question;

import java.io.Serializable;

public interface IGenericService<T extends Serializable> {
    public IGenericDto<T> create(T entity);
    public IGenericDto<T> getById(String id);
    public void update(T entity);
    public void deleteById(String id);
}
