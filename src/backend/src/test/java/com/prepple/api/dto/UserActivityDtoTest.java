package com.prepple.api.dto;

import com.prepple.api.model.practice.Status;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class UserActivityDtoTest {
    @Test
    void userActivityDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        UserActivityDto testEntity1 = UserActivityDto.builder()
                .id(200L + "-" + 100L)
                .questionId(100L)
                .userId(200L)
                .status(Status.PLANNED)
                .createdAt(createdAt)
                .build();
        UserActivityDto testEntity2 = UserActivityDto.builder()
                .id(200L + "-" + 100L)
                .questionId(100L)
                .userId(200L)
                .status(Status.PLANNED)
                .createdAt(createdAt)
                .build();
        UserActivityDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getId(), testEntity2.getId());
        assertEquals(testEntity1.getQuestionId(), testEntity2.getQuestionId());
        assertEquals(testEntity1.getUserId(), testEntity2.getUserId());
        assertEquals(testEntity1.getStatus(), testEntity2.getStatus());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void userActivityDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        UserActivityDto testEntity1 = UserActivityDto.builder()
                .id(222L + "-" + 111L)
                .questionId(111L)
                .userId(222L)
                .status(Status.ATTEMPTED)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        UserActivityDto testEntity2 = UserActivityDto.builder()
                .id(200L + "-" + 100L)
                .questionId(100L)
                .userId(200L)
                .status(Status.PLANNED)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getQuestionId(), testEntity2.getQuestionId());
        assertNotEquals(testEntity1.getUserId(), testEntity2.getUserId());
        assertNotEquals(testEntity1.getStatus(), testEntity2.getStatus());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void userActivityDto_valuesCannotChangeOnceSet() {
        Method[] methods = UserActivityDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
