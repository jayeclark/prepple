package com.prepple.api.dto;

import com.prepple.api.model.shared.MediaFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;

/**
 * Dto implementation for the Media File entity
 */
@Data
@Builder
@AllArgsConstructor
public class MediaFileDto implements IGenericDto<MediaFile>{
    private final Long id;

    @NonNull
    private final String s3Key;

    private final String name;

    private final Boolean isPrivate;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;

    private final Time expiresAt;
}
