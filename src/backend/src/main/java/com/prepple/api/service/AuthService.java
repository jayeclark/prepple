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

/**
 * Service to parse JSON web token and check on authentication and authorization status for various API routes
 */
@Component
public class AuthService {
    @Autowired
    JwtDecoder decoder;

    /**
     * Method to determine whether a user is authorized to access a route bassed on their passed JWT & the requested
     * method & path
     * @param sessionToken JWT of the user (can be null)
     * @param requestMethodAndPath Method and path requested by the user
     * @return boolean Authorization status of the current user for the requested resource
     */
    public boolean isUserAuthorizedToAccessRoute(String sessionToken, String requestMethodAndPath) {
        return isUserAuthenticated(sessionToken) &&
                !isTokenInDenyList(sessionToken) &&
                isResourceInScope(requestMethodAndPath, sessionToken);
    }

    /**
     * Method to determine whether a user is authenticated (has a valid, unexpired jwt)
     * // TODO: Update to account for refresh token
     * @param sessionToken The user's JWT
     * @return boolean Whether the user is authenticated or not - is their token valid and unexpired?
     */
    private boolean isUserAuthenticated(String sessionToken) {
        Date expires = Date.from(Instant.now().minusSeconds(1));
        try {
            expires = decoder.decodeToken(sessionToken).getPayload().getExpires();
        } catch (JsonProcessingException e){
            // TODO: Log error
        }
        return decoder.isTokenValid(sessionToken) && expires.toInstant().isAfter(Instant.now());
    }

    /**
     * Method to check whether a JWT has been manually expired. If a token has been manually expired the
     * request should not be considered authorized as the user is no longer authenticated
     * @param sessionToken The JWT passed to the API
     * @return boolean whether the token is in the deny list or not
     */
    private boolean isTokenInDenyList(String sessionToken) {
        // TODO: Implement DDB table for manually expired tokens
        System.out.println(sessionToken);
        return false;
    }

    /**
     * Method to determine whether a request resource is one that a user is authorized to access, based on the
     * groups that the JWT identifies them as being a member of.
     * @param requestMethodAndPath The requested API resource
     * @param sessionToken The JWT passed to the API
     * @return boolean Whether the resource is authorized for the user or not
     */

    private boolean isResourceInScope(String requestMethodAndPath, String sessionToken) {
        Boolean isInScope = false;
        try {
            isInScope = Authorization.isInScope(requestMethodAndPath, getUserGroups(sessionToken));
        } catch (JsonProcessingException e) {
            // TODO: Log error
        }

        return isInScope;
    }

    /**
     * Method to parse the session token and identify which groups a user is a member of. If the session token
     * is null (anonymous user) the user groups will be listed as "NONE"
     * @param sessionToken JWT passed to the API
     * @return List<Subscription> A list of the user's subscription groups
     * @throws JsonProcessingException
     */
    private List<Subscription> getUserGroups(String sessionToken) throws JsonProcessingException {
        List<Subscription> groups = List.of(Subscription.NONE);

        if (sessionToken != null) {
            groups = decoder.decodeToken(sessionToken).getPayload().getGroups();
        }
        return groups;
    }
}
