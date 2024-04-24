package com.prepple.api.model.practice;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "QuestionAnswers")
public class QuestionAnswer {
    @Id
    private String id;

    private Long questionId;

    private String question;

    private AnswerPlan[] answers;

}
