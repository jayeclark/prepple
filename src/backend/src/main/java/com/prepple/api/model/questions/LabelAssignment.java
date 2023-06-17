package com.prepple.api.model.questions;

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
public class LabelAssignment implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    @ManyToOne
    @JoinColumn(name="question_id", referencedColumnName="id")
    private Question question;

    @NonNull
    @ManyToOne
    @JoinColumn(name="label_id", referencedColumnName="id")
    private Label label;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;
}
