package com.prepple.api.dto;

import com.prepple.api.model.mentorship.BulkDiscount;
import com.prepple.api.model.mentorship.ContentType;
import com.prepple.api.model.questions.Label;
import com.prepple.api.model.questions.LabelType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

@Data
@Builder
@AllArgsConstructor
public class BulkDiscountDto implements IGenericDto<BulkDiscount>{
    private final Long id;

    @NonNull
    private final Long mentorId;

    @NonNull
    private final ContentType contentType;

    @NonNull
    private final Integer numberOfSessions;

    @NonNull
    private final Integer discountPercent;

    private final String comments;

    @NonNull
    private final Boolean isActive;

    @NonNull
    private final Time startTime;

    @NonNull
    private final Time endTime;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
