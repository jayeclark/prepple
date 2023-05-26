package com.prepple.api.model;

import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Question {
    @Id
    private String id;
    private String question;
}
