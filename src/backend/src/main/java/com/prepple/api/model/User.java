package com.prepple.api.model;

import lombok.*;

import javax.persistence.*;
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

    @NonNull
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
