package com.prepple.api.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.prepple.api.model.Question;
import lombok.*;

import java.sql.Time;

/**
 * Dto implementation for the question entity
 */
@Data
@Builder
@AllArgsConstructor
public class QuestionDto implements IGenericDto<Question> {
    private final Long id;

    @NonNull
    private final String urn;

    @NonNull
    private final String title;

    @NonNull
    private final String question;

    private final Long parentId;

    private final double acceptance;

    private final double variation;

    private final double frequency;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;

}
