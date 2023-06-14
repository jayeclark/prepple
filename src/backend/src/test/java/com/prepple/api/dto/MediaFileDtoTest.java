package com.prepple.api.dto;

import com.prepple.api.model.LabelType;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class MediaFileDtoTest {
    @Test
    void mediaFileDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        MediaFileDto testEntity1 = MediaFileDto.builder()
                .id(1L)
                .s3Key("abc")
                .name("def")
                .isPrivate(true)
                .createdAt(createdAt)
                .build();
        MediaFileDto testEntity2 = MediaFileDto.builder()
                .id(1L)
                .s3Key("abc")
                .name("def")
                .isPrivate(true)
                .createdAt(createdAt)
                .build();
        MediaFileDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getId(), testEntity2.getId());
        assertEquals(testEntity1.getS3Key(), testEntity2.getS3Key());
        assertEquals(testEntity1.getName(), testEntity2.getName());
        assertEquals(testEntity1.getIsPrivate(), testEntity2.getIsPrivate());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void mediaFileDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        MediaFileDto testEntity1 = MediaFileDto.builder()
                .id(1L)
                .s3Key("abc")
                .name("def")
                .isPrivate(true)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        MediaFileDto testEntity2 = MediaFileDto.builder()
                .id(2L)
                .s3Key("bcd")
                .name("efg")
                .isPrivate(false)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getS3Key(), testEntity2.getS3Key());
        assertNotEquals(testEntity1.getName(), testEntity2.getName());
        assertNotEquals(testEntity1.getIsPrivate(), testEntity2.getIsPrivate());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void mediaFileDto_valuesCannotChangeOnceSet() {
        Method[] methods = MediaFileDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
