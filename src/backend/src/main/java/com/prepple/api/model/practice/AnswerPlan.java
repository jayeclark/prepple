package com.prepple.api.model.practice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerPlan {
    private String id;

    private String plan;

    private PlanStructure planStructure;

    private String prompt;

    private String[] keywords;

    private Integer listenabilityScore;

    private Integer projectedLengthInSeconds;

    private Map<String, Object> contentAnalysis;

    private AnswerAttempt[] answerAttempts;
}
