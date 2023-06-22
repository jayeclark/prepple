package com.prepple.api.dto;

import com.prepple.api.model.practice.Status;
import com.prepple.api.model.practice.UserActivity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

@Data
@Builder
@AllArgsConstructor
public class UserActivityDto implements IGenericDto<UserActivity>{
    @NonNull
    private final String id;

    @NonNull
    private final Long questionId;

    @NonNull
    private final Long userId;

    @NonNull
    private final Status status;

    private final Integer answerPlanCount;

    private final Integer answerVideoCount;

    @NonNull
    private final Time createdAt;

    private final Time firstPlannedAt;

    private final Time lastPlannedAt;

    private final Time firstRecordedAt;

    private final Time lastRecordedAt;

}
