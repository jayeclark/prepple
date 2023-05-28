package com.prepple.api.model;

import lombok.Data;
import java.util.List;

@Data
public class QuestionBatchRequest extends AbstractBatchRequest<String> {
    public QuestionBatchRequest() {
        super();
    }
}
