package com.prepple.api.configuration;

import static com.prepple.api.configuration.Constants.POSTGRES_URL_KEY;
import static com.prepple.api.configuration.Constants.POSTGRES_USERNAME_KEY;
import static com.prepple.api.configuration.Constants.POSTGRES_PASSWORD_KEY;

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
                return pgUrl;
        }
        return null;
    }

    public static String getDbUsername(Database db) {
        switch(db) {
            case POSTGRES:
                return pgUsername;
        }
        return null;
    }

    public static String getDbPassword(Database db) {
        switch(db) {
            case POSTGRES:
                return pgPassword;
        }
        return null;
    }
}
