package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class MentorProfileDtoTest {
    @Test
    void mentorProfileDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        MentorProfileDto testEntity1 = MentorProfileDto.builder()
                .urn("abc")
                .userId(100L)
                .bio("ghi")
                .isAcceptingRequests(true)
                .maxRequestsPerWeek(7)
                .typicalTurnaroundTimeInDays(2)
                .createdAt(createdAt)
                .build();
        MentorProfileDto testEntity2 = MentorProfileDto.builder()
                .urn("abc")
                .userId(100L)
                .bio("ghi")
                .isAcceptingRequests(true)
                .maxRequestsPerWeek(7)
                .typicalTurnaroundTimeInDays(2)
                .createdAt(createdAt)
                .build();
        MentorProfileDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertEquals(testEntity1.getUserId(), testEntity2.getUserId());
        assertEquals(testEntity1.getBio(), testEntity2.getBio());
        assertEquals(testEntity1.getIsAcceptingRequests(), testEntity2.getIsAcceptingRequests());
        assertEquals(testEntity1.getMaxRequestsPerWeek(), testEntity2.getMaxRequestsPerWeek());
        assertEquals(testEntity1.getTypicalTurnaroundTimeInDays(), testEntity2.getTypicalTurnaroundTimeInDays());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void mentorProfileDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        MentorProfileDto testEntity1 = MentorProfileDto.builder()
                .urn("abc")
                .userId(100L)
                .bio("ghi")
                .isAcceptingRequests(true)
                .maxRequestsPerWeek(7)
                .typicalTurnaroundTimeInDays(2)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        MentorProfileDto testEntity2 = MentorProfileDto.builder()
                .urn("bcd")
                .userId(200L)
                .bio("hij")
                .isAcceptingRequests(false)
                .maxRequestsPerWeek(14)
                .typicalTurnaroundTimeInDays(4)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getUserId(), testEntity2.getUserId());
        assertNotEquals(testEntity1.getBio(), testEntity2.getBio());
        assertNotEquals(testEntity1.getIsAcceptingRequests(), testEntity2.getIsAcceptingRequests());
        assertNotEquals(testEntity1.getMaxRequestsPerWeek(), testEntity2.getMaxRequestsPerWeek());
        assertNotEquals(testEntity1.getTypicalTurnaroundTimeInDays(), testEntity2.getTypicalTurnaroundTimeInDays());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void mentorProfileDto_valuesCannotChangeOnceSet() {
        Method[] methods = MentorProfileDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
