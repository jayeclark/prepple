package com.prepple.api.model;

import java.util.List;

abstract public class AbstractBatchRequest<T> {
    List<T> idsToFetch;
}
