package com.prepple.api.model.mentorship;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prepple.api.model.shared.MediaFile;
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
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Rating implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @ManyToOne
    @JoinColumn(name="request_id", referencedColumnName="id")
    @JsonProperty("requestId")
    private MicroMentorshipRequest request;

    @ManyToOne
    @JoinColumn(name="rater_id", referencedColumnName="id")
    @JsonProperty("raterId")
    private User user;

    private String raterIpAddress;

    private String comments;

    @OneToOne
    @JoinColumn(name="file_id", referencedColumnName="id")
    @JsonProperty("fileId")
    private MediaFile videoMessage;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
