package com.prepple.api.dto;

import com.prepple.api.model.mentorship.ContentType;
import com.prepple.api.model.shared.Currency;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class MicroMentorshipRequestDtoTest {
    @Test
    void microMentorshipRequestDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        MicroMentorshipRequestDto testEntity1 = MicroMentorshipRequestDto.builder()
                .id(1L)
                .urn("abc")
                .contentId(2L)
                .contentType(ContentType.SINGLE_RECORDING)
                .mentorId(3L)
                .menteeId(4L)
                .cost(1500)
                .currency(Currency.USD)
                .notes("def")
                .createdAt(createdAt)
                .build();
        MicroMentorshipRequestDto testEntity2 = MicroMentorshipRequestDto.builder()
                .id(1L)
                .urn("abc")
                .contentId(2L)
                .contentType(ContentType.SINGLE_RECORDING)
                .mentorId(3L)
                .menteeId(4L)
                .cost(1500)
                .currency(Currency.USD)
                .notes("def")
                .createdAt(createdAt)
                .build();
        MicroMentorshipRequestDto testEntity3 = testEntity1;

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
        assertEquals(testEntity1.getContentId(), testEntity2.getContentId());
        assertEquals(testEntity1.getContentType(), testEntity2.getContentType());
        assertEquals(testEntity1.getMentorId(), testEntity2.getMentorId());
        assertEquals(testEntity1.getMenteeId(), testEntity2.getMenteeId());
        assertEquals(testEntity1.getCost(), testEntity2.getCost());
        assertEquals(testEntity1.getCurrency(), testEntity2.getCurrency());
        assertEquals(testEntity1.getNotes(), testEntity2.getNotes());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void microMentorshipRequestDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        MicroMentorshipRequestDto testEntity1 = MicroMentorshipRequestDto.builder()
                .id(1L)
                .urn("abc")
                .contentId(2L)
                .contentType(ContentType.SINGLE_RECORDING)
                .mentorId(3L)
                .menteeId(4L)
                .cost(1500)
                .currency(Currency.USD)
                .notes("def")
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        MicroMentorshipRequestDto testEntity2 = MicroMentorshipRequestDto.builder()
                .id(5L)
                .urn("bcd")
                .contentId(6L)
                .contentType(ContentType.SINGLE_RESUME)
                .mentorId(7L)
                .menteeId(8L)
                .cost(1600)
                .currency(Currency.CAD)
                .notes("efg")
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getContentId(), testEntity2.getContentId());
        assertNotEquals(testEntity1.getContentType(), testEntity2.getContentType());
        assertNotEquals(testEntity1.getMentorId(), testEntity2.getMentorId());
        assertNotEquals(testEntity1.getMenteeId(), testEntity2.getMenteeId());
        assertNotEquals(testEntity1.getCost(), testEntity2.getCost());
        assertNotEquals(testEntity1.getCurrency(), testEntity2.getCurrency());
        assertNotEquals(testEntity1.getNotes(), testEntity2.getNotes());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void microMentorshipRequestDto_valuesCannotChangeOnceSet() {
        Method[] methods = MicroMentorshipRequestDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
