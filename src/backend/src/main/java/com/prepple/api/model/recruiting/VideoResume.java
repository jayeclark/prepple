package com.prepple.api.model.recruiting;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prepple.api.model.practice.Recording;
import com.prepple.api.util.HashMapConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.sql.Time;
import java.util.Map;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoResume implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @NonNull
    @Column(name="name")
    private String resumeName;

    @NonNull
    @ManyToOne
    @JoinColumn(name="recording_ids", referencedColumnName="id")
    @JsonProperty("recordingIds")
    private Recording[] recordings;

    @NonNull
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> resume;

    @NonNull
    private Boolean isArchived;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;

}
