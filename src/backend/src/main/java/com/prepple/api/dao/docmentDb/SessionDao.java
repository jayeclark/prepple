package com.prepple.api.dao.docmentDb;

import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

/**
 * Interacts with the session table in DDB to retrieve stored info on session activities
 */
@Repository
public class SessionDao {

    /**
     * Returns a list of URNs from the ddb session row
     * @param session_token session token to identify the session
     * @return
     */
    public List<String> getSeenQuestionUrns(String session_token) {
        // Stub to mock capability of retrieving seen question urns based on session
        return Arrays.asList("123");
    }
}
