package com.prepple.api.model;

import lombok.Data;

import java.util.List;

/**
 * Defines an abstract batch request for a specific entity type.
 * Some entity types may extend this with additional fields as needed.
 * @param <T> The entity type for which the batch request is being submitted.
 */
@Data
abstract public class AbstractBatchRequest<T> {
    List<T> urnsToFetch;
}
