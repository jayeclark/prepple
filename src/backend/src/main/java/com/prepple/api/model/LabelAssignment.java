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
public class LabelAssignment implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="question_id", referencedColumnName="id")
    private Question question;

    @ManyToOne
    @JoinColumn(name="label_id", referencedColumnName="id")
    private Label label;

    @Column(name="created_at")
    @NonNull
    private Time createdAt;
}
