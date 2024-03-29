package com.prepple.api.model.mentorship;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prepple.api.model.shared.Currency;
import com.prepple.api.model.shared.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MentorProfile implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @NonNull
    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    @JsonProperty("userId")
    private User user;

    @NonNull
    private String bio;

    @NonNull
    private Boolean isAcceptingRequests;

    private Integer maxRequestsPerWeek;

    private Integer costPerVideo;

    private Integer costPerResume;

    private Currency preferredCurrency;

    @NonNull
    @Column(name="turnaround_time")
    private Integer typicalTurnaroundTimeInDays;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
