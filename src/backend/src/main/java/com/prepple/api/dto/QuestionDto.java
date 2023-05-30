package com.prepple.api.dto;

import com.prepple.api.model.Question;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;

/**
 * Dto implementation for the question entity
 */
@Data
@NoArgsConstructor
public class QuestionDto implements IGenericDto<Question> {
    private String id;
    private String title;
    private String question;
    private String parentId;
    private double acceptance;
    private double variation;
    private double frequency;
    private Time createdAt;
    private Time updatedAt;
}
