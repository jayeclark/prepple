package com.prepple.api.dto;

import com.prepple.api.model.recruiting.VideoResume;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.sql.Time;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class VideoResumeDto implements IGenericDto<VideoResume>{
    private final Long id;

    @NonNull
    private final String urn;

    private final String resumeName;

    @NonNull
    private final Long[] recordingIds;

    @NonNull
    private final Map<String, Object> resume;

    @NonNull
    private final Boolean isArchived;

    @NonNull
    private final Time createdAt;

    private final Time updatedAt;
}
