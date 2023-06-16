package com.prepple.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prepple.api.util.HashMapConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.sql.Time;
import java.util.Map;

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
    @JsonProperty("fileId")
    private MediaFile file;

    @NonNull
    @Column(name="answer_id")
    private String answerId;

    @Column(name="content")
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> contentAnalysis;

    @Column(name="listenability")
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> listenabilityAnalysis;

    @Column(name="facial_expression")
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> facialExpressionAnalysis;

    @Column(name="audio_tone")
    @Convert(converter = HashMapConverter.class)
    private Map<String, Object> audioToneAnalysis;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
