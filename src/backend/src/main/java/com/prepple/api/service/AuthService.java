package com.prepple.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.prepple.api.configuration.Authorization;
import com.prepple.api.model.Subscription;
import com.prepple.api.util.JwtDecoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Component
public class AuthService {
    @Autowired
    JwtDecoder decoder;

    public boolean isUserAuthorizedToAccessRoute(String sessionToken, String requestMethodAndPath) {
        return isUserAuthenticated(sessionToken) &&
                !isTokenInDenyList(sessionToken) &&
                isResourceInScope(requestMethodAndPath, sessionToken);
    }

    private boolean isUserAuthenticated(String sessionToken) {
        Date expires = Date.from(Instant.now().minusSeconds(1));
        try {
            expires = decoder.decodeToken(sessionToken).getPayload().getExpires();
        } catch (JsonProcessingException e){
            // TODO: Log error
        }
        return decoder.isTokenValid(sessionToken) && expires.toInstant().isAfter(Instant.now());
    }

    private boolean isTokenInDenyList(String sessionToken) {
        // TODO: Implement DDB table for manually expired tokens
        System.out.println(sessionToken);
        return false;
    }

    private boolean isResourceInScope(String requestMethodAndPath, String sessionToken) {
        Boolean isInScope = false;
        try {
            isInScope = Authorization.isInScope(requestMethodAndPath, getUserGroups(sessionToken));
        } catch (JsonProcessingException e) {
            // TODO: Log error
        }

        return isInScope;
    }

    private List<Subscription> getUserGroups(String sessionToken) throws JsonProcessingException {
        List<Subscription> groups = List.of(Subscription.NONE);

        if (sessionToken != null) {
            groups = decoder.decodeToken(sessionToken).getPayload().getGroups();
        }
        return groups;
    }
}
