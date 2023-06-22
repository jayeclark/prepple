package com.prepple.api.dto;

import com.prepple.api.model.shared.EntityType;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class FavoriteDtoTest {
    @Test
    void favoriteDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        FavoriteDto testEntity1 = FavoriteDto.builder()
                .id(1L)
                .favoriteId("2L")
                .entityType(EntityType.GUIDE)
                .user(3L)
                .createdAt(createdAt)
                .build();
        FavoriteDto testEntity2 = FavoriteDto.builder()
                .id(1L)
                .favoriteId("2L")
                .entityType(EntityType.GUIDE)
                .user(3L)
                .createdAt(createdAt)
                .build();
        FavoriteDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getId(), testEntity2.getId());
        assertEquals(testEntity1.getFavoriteId(), testEntity2.getFavoriteId());
        assertEquals(testEntity1.getEntityType(), testEntity2.getEntityType());
        assertEquals(testEntity1.getUser(), testEntity2.getUser());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void favoriteDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        FavoriteDto testEntity1 = FavoriteDto.builder()
                .id(1L)
                .favoriteId("2L")
                .entityType(EntityType.GUIDE)
                .user(3L)
                .createdAt(new Time(Instant.now().toEpochMilli()))
                .build();
        FavoriteDto testEntity2 = FavoriteDto.builder()
                .id(4L)
                .favoriteId("5L")
                .entityType(EntityType.ANSWER)
                .user(6L)
                .createdAt(new Time(Instant.now().minusMillis(1000).toEpochMilli()))
                .build();

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getId(), testEntity2.getId());
        assertNotEquals(testEntity1.getFavoriteId(), testEntity2.getFavoriteId());
        assertNotEquals(testEntity1.getEntityType(), testEntity2.getEntityType());
        assertNotEquals(testEntity1.getUser(), testEntity2.getUser());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void favoriteDto_valuesCannotChangeOnceSet() {
        Method[] methods = FavoriteDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
