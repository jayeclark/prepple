package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class RatingDtoTest {
    @Test
    void ratingDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        RatingDto testEntity1 = RatingDto.builder()
                .id(1L)
                .urn("abc")
                .requestId(2L)
                .raterId(3L)
                .comments("def")
                .fileId(4L)
                .createdAt(createdAt)
                .build();
        RatingDto testEntity2 = RatingDto.builder()
                .id(1L)
                .urn("abc")
                .requestId(2L)
                .raterId(3L)
                .comments("def")
                .fileId(4L)
                .createdAt(createdAt)
                .build();
        RatingDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) ); // skipcq: JAVA-E0034
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getId(), testEntity2.getId());
        assertEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertEquals(testEntity1.getRequestId(), testEntity2.getRequestId());
        assertEquals(testEntity1.getRaterId(), testEntity2.getRaterId());
        assertEquals(testEntity1.getComments(), testEntity2.getComments());
        assertEquals(testEntity1.getFileId(), testEntity2.getFileId());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void ratingDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        RatingDto testEntity1 = RatingDto.builder()
                .id(1L)
                .urn("abc")
                .requestId(2L)
                .raterId(3L)
                .comments("def")
                .fileId(4L)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        RatingDto testEntity2 = RatingDto.builder()
                .id(5L)
                .urn("bcd")
                .requestId(6L)
                .raterId(7L)
                .comments("efg")
                .fileId(8L)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getRequestId(), testEntity2.getRequestId());
        assertNotEquals(testEntity1.getRaterId(), testEntity2.getRaterId());
        assertNotEquals(testEntity1.getComments(), testEntity2.getComments());
        assertNotEquals(testEntity1.getFileId(), testEntity2.getFileId());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void ratingDto_valuesCannotChangeOnceSet() {
        Method[] methods = RatingDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
