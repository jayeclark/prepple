package com.prepple.api.model.questions;

import com.prepple.api.model.shared.AbstractBatchRequest;
import lombok.Data;

/**
 * Batch request implementation for the Question entity
 */
@Data
public class QuestionBatchRequest extends AbstractBatchRequest<String> {
    /**
     * Generic constructor
     */
    public QuestionBatchRequest() {
        super();
    }
}
