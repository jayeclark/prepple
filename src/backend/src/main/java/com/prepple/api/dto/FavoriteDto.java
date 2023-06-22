package com.prepple.api.dto;

import com.prepple.api.model.shared.EntityType;
import com.prepple.api.model.shared.Favorite;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

/**
 * Dto implementation for the Favorite entity
 */
@Data
@Builder
@AllArgsConstructor
public class FavoriteDto implements IGenericDto<Favorite>{
    private final Long id;

    @NonNull
    private final String favoriteId;

    @NonNull
    private final EntityType entityType;

    @NonNull
    private final Long user;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
