package com.prepple.api.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Mapper {
    private static ObjectMapper instance = null;

    public static ObjectMapper getInstance() {
        if (instance == null) {
            instance = new ObjectMapper();
        }
        return instance;
    }
}
