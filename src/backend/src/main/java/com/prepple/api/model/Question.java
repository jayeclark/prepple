package com.prepple.api.model;

import com.fasterxml.jackson.databind.jsonschema.JsonSerializableSchema;
import lombok.*;

import javax.annotation.Nonnull;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
public class Question implements Serializable {
    @Id
    @Column(name="question_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @NonNull
    private String title;

    @NonNull
    private String question;

    @ManyToOne
    @JoinColumn(name="parent_id", referencedColumnName="question_id")
    private Question parent;

    @Column(name="guide_id")
    private String guideId;

    private double acceptance;

    private double variation;

    private double frequency;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
