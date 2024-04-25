package com.prepple.models;

public enum Status {
    IN_DEVELOPMENT("in_development"),
    ACTIVE("active"),
    DISABLED("disabled"),
    DEPRECATED("deprecated");

    private String value = "";

    Status(String status) {
        switch (status) {
            case "in_development":
            case "active":
            case "disabled":
            case "deprecated":
                break;
            default:
                throw new IllegalArgumentException("invalid status");
        }
    }

    public String getValue() {
        return this.value;
    }
}
