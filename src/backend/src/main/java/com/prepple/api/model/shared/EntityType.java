package com.prepple.api.model.shared;

/**
 * Enum of the various entity types in the system. Currently used for the favorites system.
 * A favorite consists of an entity type and an ID identifying the specific entity.
 */
public enum EntityType {
    USER,
    MENTOR_PROFILE,
    QUESTION,
    AUTHOR_PROFILE,
    ANSWER,
    GUIDE
}
