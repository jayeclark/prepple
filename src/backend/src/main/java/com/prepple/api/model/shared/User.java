package com.prepple.api.model.shared;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @Column(name="first_name")
    private String firstName;

    @Column(name="middle_name")
    private String middleName;

    @NonNull
    @Column(name="last_name")
    private String lastName;

    @NonNull
    private String email;

    @Column(name="subscription_tier")
    @NonNull
    private Subscription subscriptionTier;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
