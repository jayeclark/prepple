package com.prepple.api.model.practice;

/**
 * Enum of the status of a user with respect to a particular question
 *
 *  PLANNED   - the user has a recorded written answer plan
 *
 *  ATTEMPTED - the user has recorded a video answer but they either did not have it
 *              analyzed, or it failed analysis for some reason
 *
 *  COMPLETED - the user has recorded a video answer & it has passed AI analysis
 */
public enum Status {
    PLANNED,
    ATTEMPTED,
    COMPLETED
}
