package com.prepple.api.dto;

import com.prepple.api.model.questions.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

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
