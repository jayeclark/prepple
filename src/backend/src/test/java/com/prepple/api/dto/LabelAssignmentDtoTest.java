package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class LabelAssignmentDtoTest {
    @Test
    void labelAssignmentDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        LabelAssignmentDto testEntity1 = LabelAssignmentDto.builder()
                .questionId(200L)
                .labelId(100L)
                .createdAt(createdAt)
                .build();
        LabelAssignmentDto testEntity2 = LabelAssignmentDto.builder()
                .questionId(200L)
                .labelId(100L)
                .createdAt(createdAt)
                .build();
        LabelAssignmentDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getQuestionId(), testEntity2.getQuestionId());
        assertEquals(testEntity1.getLabelId(), testEntity2.getLabelId());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void labelAssignmentDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        LabelAssignmentDto testEntity1 = LabelAssignmentDto.builder()
                .questionId(200L)
                .labelId(100L)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        LabelAssignmentDto testEntity2 = LabelAssignmentDto.builder()
                .questionId(400L)
                .labelId(300L)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getLabelId(), testEntity2.getLabelId());
        assertNotEquals(testEntity1.getQuestionId(), testEntity2.getQuestionId());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void labelAssignmentDto_valuesCannotChangeOnceSet() {
        Method[] methods = LabelAssignmentDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
