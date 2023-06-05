package com.prepple.api.dto;

import com.prepple.api.model.Question;
import lombok.*;

import java.sql.Time;

/**
 * Dto implementation for the question entity
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto implements IGenericDto<Question> {
    private Long id;
    private String urn;
    private String title;
    private String question;
    private Long parentId;
    private double acceptance;
    private double variation;
    private double frequency;
    private Time createdAt;
    private Time updatedAt;
}
