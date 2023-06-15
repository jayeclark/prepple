package com.prepple.api.dto;

import com.prepple.api.model.MentorProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

@Data
@Builder
@AllArgsConstructor
public class MentorProfileDto implements IGenericDto<MentorProfile>{
    private final Long id;

    @NonNull
    private final String urn;

    @NonNull
    private final Long userId;

    @NonNull
    private final String bio;

    @NonNull
    private final Boolean isAcceptingRequests;

    private final Integer maxRequestsPerWeek;

    @NonNull
    private final Integer typicalTurnaroundTimeInDays;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
