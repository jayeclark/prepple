package com.prepple.api.model.mentorship;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BulkDiscount implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name="mentor_id", referencedColumnName="id")
    @JsonProperty("mentorId")
    private MentorProfile mentor;

    @NonNull
    private ContentType contentType;

    @NonNull
    private Integer numberOfSessions;

    @NonNull
    private Integer discountPercent;

    private String comments;

    @NonNull
    private Boolean isActive;

    @Column(name="start_time")
    @NonNull
    private Time startTime;

    @Column(name="end_time")
    @NonNull
    private Time endTime;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
