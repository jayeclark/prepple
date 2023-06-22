package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class AuthorProfileDtoTest {
    @Test
    void authorProfileDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        AuthorProfileDto testEntity1 = AuthorProfileDto.builder()
                .urn("abc")
                .userId(100L)
                .displayName("def")
                .bio("ghi")
                .createdAt(createdAt)
                .build();
        AuthorProfileDto testEntity2 = AuthorProfileDto.builder()
                .urn("abc")
                .userId(100L)
                .displayName("def")
                .bio("ghi")
                .createdAt(createdAt)
                .build();
        AuthorProfileDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) ); // skipcq: JAVA-E0034
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertEquals(testEntity1.getUserId(), testEntity2.getUserId());
        assertEquals(testEntity1.getDisplayName(), testEntity2.getDisplayName());
        assertEquals(testEntity1.getBio(), testEntity2.getBio());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void authorProfileDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        AuthorProfileDto testEntity1 = AuthorProfileDto.builder()
                .urn("abc")
                .userId(100L)
                .displayName("def")
                .bio("ghi")
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        AuthorProfileDto testEntity2 = AuthorProfileDto.builder()
                .urn("bcd")
                .userId(200L)
                .displayName("efg")
                .bio("hij")
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getUserId(), testEntity2.getUserId());
        assertNotEquals(testEntity1.getDisplayName(), testEntity2.getDisplayName());
        assertNotEquals(testEntity1.getBio(), testEntity2.getBio());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void authorProfileDto_valuesCannotChangeOnceSet() {
        Method[] methods = AuthorProfileDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
