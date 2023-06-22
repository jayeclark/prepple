package com.prepple.api.model.questions;

import com.fasterxml.jackson.annotation.JsonProperty;
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
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthorProfile implements Serializable {
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
    @Column(name="display_name")
    private String displayName;

    @NonNull
    private String bio;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
