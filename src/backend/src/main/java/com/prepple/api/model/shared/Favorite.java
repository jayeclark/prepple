package com.prepple.api.model.shared;

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
public class Favorite implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String favoriteId;

    @NonNull
    private EntityType entityType;

    @NonNull
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    @JsonProperty("userId")
    private User user;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
