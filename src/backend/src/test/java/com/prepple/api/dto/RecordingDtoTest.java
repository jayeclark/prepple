package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class RecordingDtoTest {
    @Test
    void recordingDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        RecordingDto testEntity1 = RecordingDto.builder()
                .id(1L)
                .urn("abc")
                .name("def")
                .questionId(2L)
                .answerId("ghi")
                .fileId(3L)
                .createdAt(createdAt)
                .build();
        RecordingDto testEntity2 = RecordingDto.builder()
                .id(1L)
                .urn("abc")
                .name("def")
                .questionId(2L)
                .answerId("ghi")
                .fileId(3L)
                .createdAt(createdAt)
                .build();
        RecordingDto testEntity3 = testEntity1;

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
        assertEquals(testEntity1.getQuestionId(), testEntity2.getQuestionId());
        assertEquals(testEntity1.getAnswerId(), testEntity2.getAnswerId());
        assertEquals(testEntity1.getFileId(), testEntity2.getFileId());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void recordingDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        RecordingDto testEntity1 = RecordingDto.builder()
                .id(1L)
                .urn("abc")
                .name("def")
                .questionId(2L)
                .answerId("ghi")
                .fileId(3L)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        RecordingDto testEntity2 = RecordingDto.builder()
                .id(4L)
                .urn("bcd")
                .name("efg")
                .questionId(5L)
                .answerId("hij")
                .fileId(6L)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getQuestionId(), testEntity2.getQuestionId());
        assertNotEquals(testEntity1.getAnswerId(), testEntity2.getAnswerId());
        assertNotEquals(testEntity1.getFileId(), testEntity2.getFileId());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void recordingDto_valuesCannotChangeOnceSet() {
        Method[] methods = RecordingDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> {
            assertFalse(method.getName().contains("set"));
        });
    }
}
