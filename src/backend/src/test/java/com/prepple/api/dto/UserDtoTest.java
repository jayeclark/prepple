package com.prepple.api.dto;

import com.prepple.api.model.Subscription;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
import java.sql.Time;
import java.time.Instant;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class UserDtoTest {
    @Test
    void userDTO_hasValidEqualsContract_whenObjectsAreSame() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        UserDto testEntity1 = UserDto.builder()
                .urn("abc")
                .firstName("def")
                .lastName("ghi")
                .email("jkl")
                .subscriptionTier(Subscription.NONE)
                .createdAt(createdAt)
                .build();
        UserDto testEntity2 = UserDto.builder()
                .urn("abc")
                .firstName("def")
                .lastName("ghi")
                .email("jkl")
                .subscriptionTier(Subscription.NONE)
                .createdAt(createdAt)
                .build();
        UserDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertTrue(testEntity1.equals(testEntity3));
        assertTrue(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );
        assertFalse(testEntity1.equals(null));

        assertEquals(testEntity1, testEntity2);
        assertEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertEquals(testEntity1.toString(), testEntity2.toString());
        assertEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertEquals(testEntity1.getFirstName(), testEntity2.getFirstName());
        assertEquals(testEntity1.getLastName(), testEntity2.getLastName());
        assertEquals(testEntity1.getEmail(), testEntity2.getEmail());
        assertEquals(testEntity1.getSubscriptionTier(), testEntity2.getSubscriptionTier());
        assertEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());

    }

    @Test
    void userDTO_hasValidEqualsContract_whenObjectsAreDifferent() {
        Time createdAt = new Time(Instant.now().toEpochMilli());
        UserDto testEntity1 = UserDto.builder()
                .urn("abc")
                .firstName("def")
                .lastName("ghi")
                .email("jkl")
                .subscriptionTier(Subscription.NONE)
                .createdAt(createdAt)
                .build();
        UserDto testEntity2 = UserDto.builder()
                .urn("bcd")
                .firstName("efg")
                .lastName("hij")
                .email("klm")
                .subscriptionTier(Subscription.BASIC)
                .createdAt(new Time(Instant.now().minusMillis(10000).toEpochMilli()))
                .build();
        UserDto testEntity3 = testEntity1;

        assertTrue(testEntity1.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity2.equals(testEntity1));
        assertFalse(testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) && testEntity1.equals(testEntity2) );

        assertNotEquals(testEntity1, testEntity2);
        assertNotEquals(testEntity1.hashCode(), testEntity2.hashCode());
        assertNotEquals(testEntity1.toString(), testEntity2.toString());
        assertNotEquals(testEntity1.getUrn(), testEntity2.getUrn());
        assertNotEquals(testEntity1.getFirstName(), testEntity2.getFirstName());
        assertNotEquals(testEntity1.getLastName(), testEntity2.getLastName());
        assertNotEquals(testEntity1.getEmail(), testEntity2.getEmail());
        assertNotEquals(testEntity1.getSubscriptionTier(), testEntity2.getSubscriptionTier());
        assertNotEquals(testEntity1.getCreatedAt(), testEntity2.getCreatedAt());
    }

    @Test
    void userDto_valuesCannotChangeOnceSet() {
        Method[] methods = UserDto.class.getDeclaredMethods();
        Arrays.asList(methods).forEach(method -> assertFalse(method.getName().contains("set")));
    }
}
