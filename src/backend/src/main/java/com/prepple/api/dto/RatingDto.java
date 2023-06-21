package com.prepple.api.dto;

import com.prepple.api.model.mentorship.Rating;
import com.prepple.api.model.questions.LabelType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

@Data
@Builder
@AllArgsConstructor
public class RatingDto implements IGenericDto<Rating>{
    private final Long id;

    @NonNull
    private final String urn;

    private final Long requestId;

    private final Long raterId;

    private final String raterIpAddress;

    private final String comments;

    private final Long fileId;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
