package com.prepple.api.dto;

import com.prepple.api.model.questions.LabelType;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class LabelDtoTest {
    @Test
    void labelDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        LabelDto testEntity1 = LabelDto.builder()
                .urn("abc")
                .type(LabelType.CATEGORY)
                .name("def")
                .description("ghi")
                .createdAt(createdAt)
                .build();
        LabelDto testEntity2 = LabelDto.builder()
                .urn("abc")
                .type(LabelType.CATEGORY)
                .name("def")
                .description("ghi")
                .createdAt(createdAt)
                .build();
        LabelDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertEquals(testEntity1.getName(), testEntity2.getName());
        assertEquals(testEntity1.getDescription(), testEntity2.getDescription());
        assertEquals(testEntity1.getType(), testEntity2.getType());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void labelDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        LabelDto testEntity1 = LabelDto.builder()
                .urn("abc")
                .type(LabelType.CATEGORY)
                .name("def")
                .description("ghi")
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        LabelDto testEntity2 = LabelDto.builder()
                .urn("bcd")
                .type(LabelType.COMPANY)
                .name("efg")
                .description("hij")
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getType(), testEntity2.getType());
        assertNotEquals(testEntity1.getName(), testEntity2.getName());
        assertNotEquals(testEntity1.getDescription(), testEntity2.getDescription());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void labelDto_valuesCannotChangeOnceSet() {
        Method[] methods = LabelDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
