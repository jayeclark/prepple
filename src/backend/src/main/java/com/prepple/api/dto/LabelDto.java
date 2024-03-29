package com.prepple.api.dto;

import com.prepple.api.model.questions.Label;
import com.prepple.api.model.questions.LabelType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

/**
 * Dto implementation for the Label entity
 */
@Data
@Builder
@AllArgsConstructor
public class LabelDto implements IGenericDto<Label>{
    private final Long id;

    @NonNull
    private final String urn;

    private final LabelType type;

    @NonNull
    private final String name;

    @NonNull
    private final String description;

    private final Boolean userGenerated;

    private final Long userId;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;

}
