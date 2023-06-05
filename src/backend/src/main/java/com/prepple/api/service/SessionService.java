package com.prepple.api.service;

import com.prepple.api.dao.ddb.SessionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Service for retrieving session information, including:
 * - questions that the user has seen in their current session
 */
@Component
public class SessionService {
    @Autowired
    SessionDao dao;

    /**
     * Retrieves a list of the questions seen during the current session
     * Used to ensure that a 'random' question served to the user has not been seen before
     * @param sessionToken The unique token identifying the session
     * @return List<String> a list of question URNs
     */
    public List<String> getSeenQuestionUrns(String sessionToken) {
        return dao.getSeenQuestionUrns(sessionToken);
    }
}
