package com.prepple.api.dto;

import com.prepple.api.model.mentorship.ContentType;
import com.prepple.api.model.mentorship.MicroMentorshipRequest;
import com.prepple.api.model.shared.Currency;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

@Data
@Builder
@AllArgsConstructor
public class MicroMentorshipRequestDto implements IGenericDto<MicroMentorshipRequest>{
    private final Long id;

    @NonNull
    private final String urn;

    @NonNull
    private final Long contentId;

    @NonNull
    private final ContentType contentType;

    @NonNull
    private final Long mentorId;

    @NonNull
    private final Long menteeId;

    @NonNull
    private final Integer cost;

    @NonNull
    private final Currency currency;

    @NonNull
    private final String notes;

    @NonNull
    private final Time createdAt;

    private final Time acceptedAt;

    private final Time fulfilledAt;

    private final Time declinedAt;
}