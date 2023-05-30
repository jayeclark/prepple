package com.prepple.api.configuration;

import static com.prepple.api.configuration.Constants.POSTGRES_URL_KEY;
import static com.prepple.api.configuration.Constants.POSTGRES_USERNAME_KEY;
import static com.prepple.api.configuration.Constants.POSTGRES_PASSWORD_KEY;

/**
 * Obtains environment variables and makes them available as static service configuration variables
 */
public class ServiceConfig {
    private static String pgUrl;
    private static String pgUsername;
    private static String pgPassword;

    public static final Integer MAX_QUESTION_BATCH_SIZE = 25;

    private ServiceConfig() {
        pgUrl = System.getenv(POSTGRES_URL_KEY);
        pgUsername = System.getenv(POSTGRES_USERNAME_KEY);
        pgPassword = System.getenv(POSTGRES_PASSWORD_KEY);
    }

    public static String getDbUrl(Database db) {
        switch(db) {
            case POSTGRES:
                return System.getenv(POSTGRES_URL_KEY);
        }
        return null;
    }

    public static String getDbUsername(Database db) {
        switch(db) {
            case POSTGRES:
                return System.getenv(POSTGRES_USERNAME_KEY);
        }
        return null;
    }

    public static String getDbPassword(Database db) {
        switch(db) {
            case POSTGRES:
                return System.getenv(POSTGRES_PASSWORD_KEY);
        }
        return null;
    }
}
