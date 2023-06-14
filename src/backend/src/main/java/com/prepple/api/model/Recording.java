package com.prepple.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.json.JSONObject;

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
public class Recording implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @Column(unique=true)
    private String urn;

    @NonNull
    @ManyToOne
    @JoinColumn(name="question_id", referencedColumnName="id")
    @JsonProperty("questionId")
    private Question question;

    @NonNull
    @OneToOne
    private MediaFile file;

    @NonNull
    @Column(name="answer_id")
    private String answerId;

    private JSONObject content;

    private JSONObject listenability;

    @Column(name="facial_expression")
    private JSONObject facialExpression;

    @Column(name="audio_tone")
    private JSONObject audioTone;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
