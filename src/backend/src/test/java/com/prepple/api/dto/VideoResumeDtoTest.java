package com.prepple.api.dto;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class VideoResumeDtoTest {
    @Test
    void videoResumeDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        VideoResumeDto testEntity1 = VideoResumeDto.builder()
                .id(1L)
                .urn("abc")
                .resumeName("def")
                .recordingIds(new Long[]{2L, 3L})
                .resume(Map.of("ghi", "jkl"))
                .isArchived(false)
                .createdAt(createdAt)
                .build();
        VideoResumeDto testEntity2 = VideoResumeDto.builder()
                .id(1L)
                .urn("abc")
                .resumeName("def")
                .recordingIds(new Long[]{2L, 3L})
                .resume(Map.of("ghi", "jkl"))
                .isArchived(false)
                .createdAt(createdAt)
                .build();
        VideoResumeDto testEntity3 = testEntity1;

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
        assertEquals(testEntity1.getResumeName(), testEntity2.getResumeName());
        assertEquals(Arrays.asList(testEntity1.getRecordingIds()).toString(),
                Arrays.asList(testEntity2.getRecordingIds()).toString());
        assertEquals(testEntity1.getResume(), testEntity2.getResume());
        assertEquals(testEntity1.getIsArchived(), testEntity2.getIsArchived());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void videoResumeDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        VideoResumeDto testEntity1 = VideoResumeDto.builder()
                .id(1L)
                .urn("abc")
                .resumeName("def")
                .recordingIds(new Long[]{2L, 3L})
                .resume(Map.of("ghi", "jkl"))
                .isArchived(false)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        VideoResumeDto testEntity2 = VideoResumeDto.builder()
                .id(4L)
                .urn("bcd")
                .resumeName("efg")
                .recordingIds(new Long[]{5L, 6L})
                .resume(Map.of("hij", "klm"))
                .isArchived(true)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getResumeName(), testEntity2.getResumeName());
        assertNotEquals(Arrays.asList(testEntity1.getRecordingIds()).toString(),
                Arrays.asList(testEntity2.getRecordingIds()).toString());
        assertNotEquals(testEntity1.getResume(), testEntity2.getResume());
        assertNotEquals(testEntity1.getIsArchived(), testEntity2.getIsArchived());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void videoResumeDto_valuesCannotChangeOnceSet() {
        Method[] methods = VideoResumeDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
