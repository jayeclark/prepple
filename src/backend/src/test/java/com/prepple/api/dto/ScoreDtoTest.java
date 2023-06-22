package com.prepple.api.dto;

import com.prepple.api.model.mentorship.ScoreType;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class ScoreDtoTest {
    @Test
    void scoreDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        ScoreDto testEntity1 = ScoreDto.builder()
                .id(1L)
                .ratingId(2L)
                .scoreType(ScoreType.CONFIDENCE)
                .totalPossiblePoints(10.0)
                .awardedPoints(9.0)
                .comments("abc")
                .createdAt(createdAt)
                .build();
        ScoreDto testEntity2 = ScoreDto.builder()
                .id(1L)
                .ratingId(2L)
                .scoreType(ScoreType.CONFIDENCE)
                .totalPossiblePoints(10.0)
                .awardedPoints(9.0)
                .comments("abc")
                .createdAt(createdAt)
                .build();
        ScoreDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) ); // skipcq: JAVA-E0034
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getId(), testEntity2.getId());
        assertEquals(testEntity1.getRatingId(), testEntity2.getRatingId());
        assertEquals(testEntity1.getScoreType(), testEntity2.getScoreType());
        assertEquals(testEntity1.getTotalPossiblePoints(), testEntity2.getTotalPossiblePoints());
        assertEquals(testEntity1.getAwardedPoints(), testEntity2.getAwardedPoints());
        assertEquals(testEntity1.getComments(), testEntity2.getComments());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void scoreDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        ScoreDto testEntity1 = ScoreDto.builder()
                .id(1L)
                .ratingId(2L)
                .scoreType(ScoreType.CONFIDENCE)
                .totalPossiblePoints(10.0)
                .awardedPoints(9.0)
                .comments("abc")
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        ScoreDto testEntity2 = ScoreDto.builder()
                .id(3L)
                .ratingId(4L)
                .scoreType(ScoreType.BREVITY)
                .totalPossiblePoints(5.0)
                .awardedPoints(4.0)
                .comments("def")
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getRatingId(), testEntity2.getRatingId());
        assertNotEquals(testEntity1.getScoreType(), testEntity2.getScoreType());
        assertNotEquals(testEntity1.getTotalPossiblePoints(), testEntity2.getTotalPossiblePoints());
        assertNotEquals(testEntity1.getAwardedPoints(), testEntity2.getAwardedPoints());
        assertNotEquals(testEntity1.getComments(), testEntity2.getComments());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void scoreDto_valuesCannotChangeOnceSet() {
        Method[] methods = ScoreDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
