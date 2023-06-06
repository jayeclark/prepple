package com.prepple.api.configuration;

import static com.prepple.api.configuration.Constants.*;

/**
 * Obtains environment variables and makes them available as static service configuration variables
 */
public class ServiceConfig {
    public static final Integer MAX_QUESTION_BATCH_SIZE = 25;

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

    /**
     * Returns the JWT secret key used to encode the JWT
     * @return String the secret key
     */
    public static String getJwtSecretKey() {
        return System.getenv(JWT_SECRET_KEY);
    }
}
