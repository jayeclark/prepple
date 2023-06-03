package com.prepple.api.dao.ddb;

import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class SessionDao {
    public List<String> getSeenQuestionUrns(String session_token) {
        // Stub to mock capability of retrieving seen question urns based on session
        return Arrays.asList("123");
    }
}
