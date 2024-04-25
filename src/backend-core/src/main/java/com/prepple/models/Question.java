package com.prepple.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;
import lombok.experimental.SuperBuilder;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondarySortKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSortKey;


import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.UUID;

@SuperBuilder
public class Question extends BaseEntity {
    private static final Schema SCHEMA = Schema.QUESTION;
    private static final int VERSION = 1;

    @JsonProperty("question_id")
    private String id;

    @NonNull
    @JsonProperty("status")
    @Builder.Default
    private Status status = Status.IN_DEVELOPMENT;

    @JsonProperty("public_id")
    private int publicId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("question")
    private String question;

    @JsonProperty("number_of_guides")
    private int guidesCount;

    @JsonProperty("created_at")
    @Builder.Default
    private ZonedDateTime createdTime = ZonedDateTime.now().withZoneSameInstant(ZoneOffset.UTC);

    Question(){
        super(SCHEMA, VERSION);
        this.id = UUID.randomUUID().toString();
        this.createdTime = ZonedDateTime.now().withZoneSameInstant(ZoneOffset.UTC);
    }

    @DynamoDbAttribute("pk")
    @DynamoDbPartitionKey
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @DynamoDbAttribute("sk")
    @DynamoDbSortKey
    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @DynamoDbAttribute("question_public_id")
    @DynamoDbSecondarySortKey(indexNames = {"gsi1"})
    public int getPublicId() {return this.publicId;}

    public void setPublicId(int publicId) {this.publicId = publicId;}

    @DynamoDbAttribute("title")
    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @DynamoDbAttribute("question")
    public String getQuestion() {return this.question;}

    public void setQuestion(String question) {this.question = question;}

    @DynamoDbAttribute("number_of_guides")
    @DynamoDbSecondarySortKey(indexNames = {"gsi2"})
    public int getGuidesCount() {return this.guidesCount;}

    public void setGuidesCount(int count) {this.guidesCount = count;}

    @DynamoDbAttribute("created_at")
    public ZonedDateTime getCreatedTime() {return this.createdTime;}

    public void setCreatedTime(ZonedDateTime createdTime) {this.createdTime = createdTime;}

}
