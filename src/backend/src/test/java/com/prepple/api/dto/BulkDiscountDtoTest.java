package com.prepple.api.dto;

import com.prepple.api.model.mentorship.ContentType;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class BulkDiscountDtoTest {
    @Test
    void bulkDiscountDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Instant now = Instant.now();
        Time createdAt = new Time(now.toEpochMilli());
        Time startAt = new Time(now.plusSeconds(1440 * 60).toEpochMilli());
        Time endAt = new Time(now.plusSeconds(1440 * 60 * 15).toEpochMilli());
        BulkDiscountDto testEntity1 = BulkDiscountDto.builder()
                .id(1L)
                .mentorId(2L)
                .contentType(ContentType.SINGLE_RECORDING)
                .numberOfSessions(5)
                .discountPercent(10)
                .comments("abc")
                .isActive(true)
                .startTime(startAt)
                .endTime(endAt)
                .createdAt(createdAt)
                .build();
        BulkDiscountDto testEntity2 = BulkDiscountDto.builder()
                .id(1L)
                .mentorId(2L)
                .contentType(ContentType.SINGLE_RECORDING)
                .numberOfSessions(5)
                .discountPercent(10)
                .comments("abc")
                .isActive(true)
                .startTime(startAt)
                .endTime(endAt)
                .createdAt(createdAt)
                .build();
        BulkDiscountDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) ); // skipcq: JAVA-E0034
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getId(), testEntity2.getId());
        assertEquals(testEntity1.getMentorId(), testEntity2.getMentorId());
        assertEquals(testEntity1.getContentType(), testEntity2.getContentType());
        assertEquals(testEntity1.getNumberOfSessions(), testEntity2.getNumberOfSessions());
        assertEquals(testEntity1.getDiscountPercent(), testEntity2.getDiscountPercent());
        assertEquals(testEntity1.getComments(), testEntity2.getComments());
        assertEquals(testEntity1.getIsActive(), testEntity2.getIsActive());
        assertEquals(testEntity1.getStartTime(), testEntity2.getStartTime());
        assertEquals(testEntity1.getEndTime(), testEntity2.getEndTime());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void bulkDiscountDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        Instant now = Instant.now();
        BulkDiscountDto testEntity1 = BulkDiscountDto.builder()
                .id(1L)
                .mentorId(2L)
                .contentType(ContentType.SINGLE_RECORDING)
                .numberOfSessions(5)
                .discountPercent(10)
                .comments("abc")
                .isActive(true)
                .startTime(new Time(now.plusSeconds(1440 * 60).toEpochMilli()))
                .endTime(new Time(now.plusSeconds(1440 * 60 * 15).toEpochMilli()))
                .createdAt(new Time(now.toEpochMilli()))
                .build();
        BulkDiscountDto testEntity2 = BulkDiscountDto.builder()
                .id(3L)
                .mentorId(4L)
                .contentType(ContentType.RESUME_COMPARISON)
                .numberOfSessions(15)
                .discountPercent(20)
                .comments("def")
                .isActive(false)
                .startTime(new Time(now.plusSeconds(1440 * 60 * 2).toEpochMilli()))
                .endTime(new Time(now.plusSeconds(1440 * 60 * 16).toEpochMilli()))
                .createdAt(new Time(now.minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getMentorId(), testEntity2.getMentorId());
        assertNotEquals(testEntity1.getContentType(), testEntity2.getContentType());
        assertNotEquals(testEntity1.getNumberOfSessions(), testEntity2.getNumberOfSessions());
        assertNotEquals(testEntity1.getDiscountPercent(), testEntity2.getDiscountPercent());
        assertNotEquals(testEntity1.getComments(), testEntity2.getComments());
        assertNotEquals(testEntity1.getIsActive(), testEntity2.getIsActive());
        assertNotEquals(testEntity1.getStartTime(), testEntity2.getStartTime());
        assertNotEquals(testEntity1.getEndTime(), testEntity2.getEndTime());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void bulkDiscountDto_valuesCannotChangeOnceSet() {
        Method[] methods = BulkDiscountDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
