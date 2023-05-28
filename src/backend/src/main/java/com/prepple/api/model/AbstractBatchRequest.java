package com.prepple.api.model;

import lombok.Data;

import java.util.List;

@Data
abstract public class AbstractBatchRequest<T> {
    List<T> idsToFetch;
}
