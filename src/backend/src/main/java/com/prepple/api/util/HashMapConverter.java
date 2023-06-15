package com.prepple.api.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public String convertToDatabaseColumn(Map<String, Object> customerInfo) {

        String jsonData = null;
        try {
            jsonData = objectMapper.writeValueAsString(customerInfo);
        } catch (final JsonProcessingException e) {
            System.out.println("JSON writing error");
        }

        return jsonData;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String customerInfoJSON) {

        Map<String, Object> entityData = null;
        try {
            entityData = objectMapper.readValue(customerInfoJSON,
                    new TypeReference<HashMap<String, Object>>() {});
        } catch (final IOException e) {
            System.out.println("JSON reading error");
        }

        return entityData;
    }
}