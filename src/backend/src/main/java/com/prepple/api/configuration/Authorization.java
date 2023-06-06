package com.prepple.api.configuration;

import com.prepple.api.model.Subscription;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

public class Authorization {
    private static Map<String, Set<Subscription>> authorizedScopes;

    public static void Authorization() {
        authorizedScopes = new HashMap<>();

        authorizedScopes.put(Route.GET_RANDOM_QUESTION, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                Subscription.ADMIN, Subscription.SUPERADMIN));

        authorizedScopes.put(Route.GET_QUESTION_BY_URN, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                Subscription.ADMIN, Subscription.SUPERADMIN));

        authorizedScopes.put(Route.ADD_QUESTION, Set.of(Subscription.ADMIN, Subscription.SUPERADMIN));
        authorizedScopes.put(Route.UPDATE_QUESTION, Set.of(Subscription.ADMIN, Subscription.SUPERADMIN));
        authorizedScopes.put(Route.DELETE_QUESTION, Set.of(Subscription.ADMIN, Subscription.SUPERADMIN));

        authorizedScopes.put(Route.SEARCH_QUESTIONS, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                Subscription.ADMIN, Subscription.SUPERADMIN));

        authorizedScopes.put(Route.GET_QUESTIONS_BATCH, Set.of(Subscription.NONE, Subscription.FREEMIUM, Subscription.BASIC,
                Subscription.PREMIUM, Subscription.RECRUITER_INDIVIDUAL, Subscription.RECRUITER_ENTERPRISE,
                Subscription.ADMIN, Subscription.SUPERADMIN));
    }

    public static Boolean isInScope(String path, List<Subscription> userGroups) {
        AtomicReference<Boolean> inScope = new AtomicReference<>(false);

        userGroups.stream().forEach(group -> {
            if (authorizedScopes.get(path).contains(group)) {
                inScope.set(true);
            }
        });

        return inScope.get();
    }

    public static void throwUnauthorizedResponseStatusException() {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "HTTP Status will be UNAUTHORIZED (CODE 403)\n");
    }
}
