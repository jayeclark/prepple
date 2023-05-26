package com.prepple.api.configuration;


import com.amazonaws.serverless.proxy.internal.LambdaContainerHandler;
import com.amazonaws.serverless.proxy.internal.testutils.AwsProxyRequestBuilder;
import com.amazonaws.serverless.proxy.internal.testutils.MockLambdaContext;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.prepple.api.StreamLambdaHandler;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import javax.ws.rs.HttpMethod;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.junit.Assert.*;
import static com.prepple.api.configuration.Constants.POSTGRES_URL_KEY;
import static com.prepple.api.configuration.Constants.POSTGRES_USERNAME_KEY;
import static com.prepple.api.configuration.Constants.POSTGRES_PASSWORD_KEY;


public class ServiceConfigTest {
    private static String envPgUrl;
    private static String envPgUsername;
    private static String envPgPassword;

    @BeforeClass
    public static void setUp() {
        envPgUrl = System.getenv(POSTGRES_URL_KEY);
        envPgUsername = System.getenv(POSTGRES_USERNAME_KEY);
        envPgPassword = System.getenv(POSTGRES_PASSWORD_KEY);
    }

    @Test
    public void getURL_givenPOSTGRESdb_returnsExpectedValue() {
        String url = ServiceConfig.getDbUrl(Database.POSTGRES);
        assertEquals(url, envPgUrl);
    }

    @Test
    public void getURL_givenDDBdb_returnsNull() {
        String url = ServiceConfig.getDbUrl(Database.DDB);
        assertNull(url);
    }

    @Test
    public void getURL_givenNULLdb_throwsException() {
        Boolean exceptionThrown = false;
        try {
            ServiceConfig.getDbUrl(null);
        } catch (Exception e) {
            System.out.println(e.toString());
            exceptionThrown = true;
        }
        assertTrue(exceptionThrown);
    }


    @Test
    public void getUsername_givenPOSTGRESdb_returnsExpectedValue() {
        String username = ServiceConfig.getDbUsername(Database.POSTGRES);
        assertEquals(username, envPgUsername);
    }

    @Test
    public void getUsername_givenDDBdb_returnsNull() {
        String username = ServiceConfig.getDbUsername(Database.DDB);
        assertNull(username);
    }

    @Test
    public void getUsername_givenNULLdb_throwsException() {
        Boolean exceptionThrown = false;
        try {
            ServiceConfig.getDbUsername(null);
        } catch (Exception e) {
            System.out.println(e.toString());
            exceptionThrown = true;
        }
        assertTrue(exceptionThrown);
    }


    @Test
    public void getPassword_givenPOSTGRESdb_returnsExpectedValue() {
        String password = ServiceConfig.getDbPassword(Database.POSTGRES);
        assertEquals(password, envPgPassword);
    }

    @Test
    public void getPassword_givenDDBdb_returnsNull() {
        String username = ServiceConfig.getDbPassword(Database.DDB);
        assertNull(username);
    }

    @Test
    public void getPassword_givenNULLdb_throwsException() {
        Boolean exceptionThrown = false;
        try {
            ServiceConfig.getDbPassword(null);
        } catch (Exception e) {
            System.out.println(e.toString());
            exceptionThrown = true;
        }
        assertTrue(exceptionThrown);
    }




}