package com.prepple.api.model.mentorship;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prepple.api.model.shared.Currency;
import com.prepple.api.model.shared.User;
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
public class MicroMentorshipRequest implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @NonNull
    private Long contentId;

    @NonNull
    private ContentType contentType;

    @NonNull
    @JsonProperty("mentorId")
    private MentorProfile mentor;

    @NonNull
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    @JsonProperty("menteeId")
    private User mentee;

    @NonNull
    private Integer cost;

    @NonNull
    private Currency currency;

    @NonNull
    private String notes;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="accepted_at")
    private Time acceptedAt;

    @Column(name="fulfilled_at")
    private Time fulfilledAt;

    @Column(name="declined_at")
    private Time declinedAt;
}
