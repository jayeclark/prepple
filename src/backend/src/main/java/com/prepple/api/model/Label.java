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
public class Label implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @NonNull
    private LabelType type;

    @NonNull
    private String name;

    @NonNull
    private String description;

    @NonNull
    @Column(name="user_generated")
    private boolean userGenerated;

    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName="id")
    private User user;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;

}
