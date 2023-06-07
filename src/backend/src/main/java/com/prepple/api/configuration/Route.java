package com.prepple.api.configuration;

/**
 * Contains path definitions for the various API routes
 */
public class Route {
    public static final String GET_RANDOM_QUESTION = "GET:/question/random";
    public static final String GET_QUESTION_BY_URN = "GET:/questions/{urn}";
    public static final String ADD_QUESTION = "POST:/questions";
    public static final String UPDATE_QUESTION = "PUT:/questions/{urn}";
    public static final String DELETE_QUESTION = "DELETE:/questions/{urn}";
    public static final String SEARCH_QUESTIONS = "GET:/questions";
    public static final String GET_QUESTIONS_BATCH = "POST:/questions/batch";
}
