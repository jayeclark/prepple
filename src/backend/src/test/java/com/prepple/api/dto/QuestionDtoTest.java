package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class QuestionDtoTest {
    @Test
    void questionDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        QuestionDto testEntity1 = QuestionDto.builder().title("abc").question("def").urn("ghi").createdAt(createdAt).build();
        QuestionDto testEntity2 = QuestionDto.builder().title("abc").question("def").urn("ghi").createdAt(createdAt).build();
        QuestionDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) ); // skipcq: JAVA-E0034
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getQuestion(), testEntity2.getQuestion());
        assertEquals(testEntity1.getTitle(), testEntity2.getTitle());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
        assertEquals(testEntity1.getUrn(), testEntity2.getUrn());
    }

    @Test
    void questionDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        QuestionDto testEntity1 = QuestionDto.builder()
                .title("abc")
                .question("def")
                .urn("ghi")
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        QuestionDto testEntity2 = QuestionDto.builder()
                .title("abcd")
                .question("defg")
                .urn("ghij")
                .createdAt(new Time(Instant.now().minusMillis(10000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getQuestion(), testEntity2.getQuestion());
        assertNotEquals(testEntity1.getTitle(), testEntity2.getTitle());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void questionDto_valuesCannotChangeOnceSet() {
        Method[] methods = QuestionDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
