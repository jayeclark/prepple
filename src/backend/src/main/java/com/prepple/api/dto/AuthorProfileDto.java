package com.prepple.api.dto;

import com.prepple.api.model.AuthorProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

@Data
@Builder
@AllArgsConstructor
public class AuthorProfileDto implements IGenericDto<AuthorProfile>{
    private final Long id;

    @NonNull
    private final String urn;

    @NonNull
    private final Long userId;

    @NonNull
    private final String displayName;

    @NonNull
    private final String bio;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
