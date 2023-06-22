package com.prepple.api.dto;

import com.prepple.api.model.mentorship.Score;
import com.prepple.api.model.mentorship.ScoreType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

/**
 * Dto implementation for the Score entity
 */
@Data
@Builder
@AllArgsConstructor
public class ScoreDto implements IGenericDto<Score>{
    private final Long id;

    private final Long ratingId;

    @NonNull
    private final ScoreType scoreType;

    @NonNull
    private final Double totalPossiblePoints;

    @NonNull
    private final Double awardedPoints;

    private final String comments;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
