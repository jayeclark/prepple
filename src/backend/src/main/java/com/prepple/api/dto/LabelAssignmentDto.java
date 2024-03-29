package com.prepple.api.dto;

import com.prepple.api.model.questions.LabelAssignment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

/**
 * Dto implementation for the Label Assignment entity
 */
@Data
@Builder
@AllArgsConstructor
public class LabelAssignmentDto implements IGenericDto<LabelAssignment>{
    private final Long id;

    @NonNull
    private final Long questionId;

    @NonNull
    private final Long labelId;

    @NonNull
    private final Time createdAt;

}
