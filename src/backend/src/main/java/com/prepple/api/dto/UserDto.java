package com.prepple.api.dto;

import com.prepple.api.model.shared.Subscription;
import com.prepple.api.model.shared.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

/**
 * Dto implementation for the User entity
 */
@Data
@Builder
@AllArgsConstructor
public class UserDto implements IGenericDto<User>{
    private final Long id;

    @NonNull
    private final String urn;

    private final String firstName;

    private final String middleName;

    @NonNull
    private final String lastName;

    @NonNull
    private final String email;

    @NonNull
    private final Subscription subscriptionTier;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;

}
