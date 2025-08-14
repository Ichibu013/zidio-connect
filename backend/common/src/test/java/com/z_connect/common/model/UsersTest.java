package com.z_connect.common.model;

import com.z_connect.common.enums.Role;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class UsersTest {

    @Test
    public void testLombokFunctionality() {
        // Test NoArgsConstructor
        Users user = new Users();
        assertNotNull(user);

        // Test setters (from @Data)
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("password123");
        user.setRole(Role.CANDIDATE);

        // Test getters (from @Data)
        assertEquals("John", user.getFirstName());
        assertEquals("Doe", user.getLastName());
        assertEquals("john.doe@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
        assertEquals(Role.CANDIDATE, user.getRole());

        // Test AllArgsConstructor (ensure constructor matches the entity fields order)
        Users user2 = new Users(
                1L, // id
                "Jane", // firstName
                "Smith", // lastName
                "jane.smith@example.com", // email
                "555-123-4567", // phoneNumber
                "securepass", // password
                Role.RECRUITER, // role
                null, // company
                false, // tncAccepted
                false, // isVerified
                null, // generatedOtp
                null, // createdAt
                null, // updatedAt
                false // isLoggedIn
        );

        assertEquals("Jane", user2.getFirstName());
        assertEquals("Smith", user2.getLastName());
        assertEquals("jane.smith@example.com", user2.getEmail());

        // Test equals and hashCode (from @Data)
        Users user3 = new Users();
        user3.setFirstName("John");
        user3.setLastName("Doe");
        user3.setEmail("john.doe@example.com");
        user3.setPassword("password123");
        user3.setRole(Role.CANDIDATE);

        // Align time-dependent fields so Lombok-generated equals/hashCode are deterministic
        LocalDateTime sameCreatedAt = LocalDateTime.of(2020, 1, 1, 0, 0);
        user.setCreatedAt(sameCreatedAt);
        user3.setCreatedAt(sameCreatedAt);

        assertEquals(user, user3);
        assertEquals(user.hashCode(), user3.hashCode());

        // Test toString (from @Data)
        String userString = user.toString();
        assertTrue(userString.contains("firstName=John"));
        assertTrue(userString.contains("lastName=Doe"));
        assertTrue(userString.contains("email=john.doe@example.com"));
    }
}