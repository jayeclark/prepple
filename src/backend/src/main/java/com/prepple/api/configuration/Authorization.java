package com.prepple.api.configuration;

import com.prepple.api.model.Subscription;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

/**
 * Contains static constants and methods to determine whether a particular subscription type
 * is authorized to access a given route
 */
public class Authorization {
    private static Map<String, Set<Subscription>> authorizedScopes;

    /**
     * Constructor creates a map of routes and authorized subscription types for each route
     */
    public static void Authorization() {
        authorizedScopes = new HashMap<>(){{
            put(Route.GET_RANDOM_QUESTION, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                    Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                    Subscription.ADMIN, Subscription.SUPERADMIN));

            put(Route.GET_QUESTION_BY_URN, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                    Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                    Subscription.ADMIN, Subscription.SUPERADMIN));

            put(Route.ADD_QUESTION, Set.of(Subscription.ADMIN, Subscription.SUPERADMIN));
            put(Route.UPDATE_QUESTION, Set.of(Subscription.ADMIN, Subscription.SUPERADMIN));
            put(Route.DELETE_QUESTION, Set.of(Subscription.ADMIN, Subscription.SUPERADMIN));

            put(Route.SEARCH_QUESTIONS, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                    Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                    Subscription.ADMIN, Subscription.SUPERADMIN));

            put(Route.GET_QUESTIONS_BATCH, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                    Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                    Subscription.ADMIN, Subscription.SUPERADMIN));
        }};

    }

    /**
     * Checks whether a given user is authorized to access a particular API route based on their subscription groups
     * @param path The resource being accessed (in form {METHOD}:{path})
     * @param userGroups The groups to which the user belongs. If no auth token is passed, user groups will be NONE
     * @return Boolean is the path in scope for the user or not
     */
    public static Boolean isInScope(String path, List<Subscription> userGroups) {
        AtomicReference<Boolean> inScope = new AtomicReference<>(false);

        userGroups.stream().forEach(group -> {
            if (authorizedScopes.get(path).contains(group)) {
                inScope.set(true);
            }
        });

        return inScope.get();
    }

    /**
     * Throws response status exception, type = UNAUTHORIZED
     */
    public static void throwUnauthorizedResponseStatusException() {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "HTTP Status will be UNAUTHORIZED (CODE 403)\n");
    }
}
