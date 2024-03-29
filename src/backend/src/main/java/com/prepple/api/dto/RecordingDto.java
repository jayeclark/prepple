package com.prepple.api.dto;

import com.prepple.api.model.practice.Recording;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;
import java.util.Map;

/**
 * Dto implementation for the Recording entity
 */
@Data
@Builder
@AllArgsConstructor
public class RecordingDto implements IGenericDto<Recording>{
    private final Long id;

    @NonNull
    private final String urn;

    private final String name;

    @NonNull
    private final Long questionId;

    @NonNull
    private final Long fileId;

    @NonNull
    private final String answerId;

    private final Map<String, Object> contentAnalysis;

    private final Map<String, Object> listenabilityAnalysis;

    private final Map<String, Object> facialExpressionAnalysis;

    private final Map<String, Object> audioToneAnalysis;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
