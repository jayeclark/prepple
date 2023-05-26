package com.prepple.api.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Data
public class Question {
    @Id
    @Column(name="question_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String title;

    private String question;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question parent;

    private double acceptance;

    private double variation;

    private double frequency;

    @Column(name="created_at")
    private Time createdAt;

    @Column(name="updated_at")
    private Time updatedAt;
}
