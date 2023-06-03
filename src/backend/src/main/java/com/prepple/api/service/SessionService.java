package com.prepple.api.service;

import com.prepple.api.dao.ddb.SessionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SessionService {
    @Autowired
    SessionDao dao;

    public List<String> getSeenQuestionUrns(String sessionToken) {
        return dao.getSeenQuestionUrns(sessionToken);
    }
}
