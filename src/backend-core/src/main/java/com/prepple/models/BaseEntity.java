package com.prepple.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.NonNull;
import lombok.experimental.SuperBuilder;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbAttribute;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbSecondaryPartitionKey;

@SuperBuilder
public abstract class BaseEntity {
    @NonNull
    @JsonProperty("schema")
    protected Schema schema;

    @JsonProperty("schema_version")
    protected int schemaVersion;

    @JsonIgnore
    @Builder.Default
    protected String tenant = "prepple";

    BaseEntity(Schema schema, int version) {
        this.schema = schema;
        this.schemaVersion = version;
    }

    BaseEntity(Schema schema, int version, String tenant) {
        this.schema = schema;
        this.schemaVersion = version;
        this.tenant = tenant;
    }

    @DynamoDbAttribute("schema")
    protected Schema getSchema() {
        return this.schema;
    }

    protected void setSchema(Schema schema) {
        this.schema = schema;
    }

    @DynamoDbAttribute("schema_version")
    protected int getSchemaVersion() {
        return this.schemaVersion;
    }

    protected void setSchemaVersion(int schemaVersion) {
        this.schemaVersion = schemaVersion;
    }

    @DynamoDbAttribute("tenant")
    @DynamoDbSecondaryPartitionKey(indexNames = {"gsi1", "gsi2"})
    public String getTenant() {return this.tenant;}

    public void setTenant(String tenant) {this.tenant = tenant;}
}
