package com.prepple.api.model.practice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnswerAttempt {
    private String id;

    private String s3key;

    private String thumbnailKey;

    private Boolean isPrivate;

    private Map<String, Object> contentAnalysis;

    private Map<String, Object> listenabilityAnalysis;

    private Map<String, Object> facialExpressionAnalysis;

    private Map<String, Object> audioToneAnalysis;

    private Date createdAt;
}
