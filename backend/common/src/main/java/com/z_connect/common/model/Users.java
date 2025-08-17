package com.z_connect.common.model;


import com.z_connect.common.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entity class representing a user in the application.
 * This class is mapped to the 'users' table in the database.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    /**
     * The unique identifier for the user.
     * This field is the primary key and is auto-incremented by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The first name of the user.
     * This field cannot be null.
     */
    @Column(name = "first_name", nullable = false)
    @NotNull
    private String firstName;

    /**
     * The last name of the user.
     * This field cannot be null.
     */
    @Column(name = "last_name", nullable = false)
    @NotNull
    private String lastName;

    /**
     * The user's email address.
     * This field is unique across all users.
     */
    @Column(name = "email", unique = true)
    @NotNull
    @Email
    private String email;


    /**
     * The user's phone number.
     * This field is unique across all users.
     */
    @Column(name = "phone_number", length = 11, unique = true)
    private String phoneNumber;

    /**
     * The hashed password of the user.
     * This field cannot be null.
     */
    @Column(name = "password", nullable = false)
    @NotNull
    private String password;

    /**
     * The role of the user (e.g., CANDIDATE, RECRUITER, ADMIN).
     * This field cannot be null.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    @NotNull
    private Role role;

    /**
     * The company this user is associated with.
     * This is an optional foreign key for recruiters.
     * Mapped to the 'companies' table.
     */
    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;


    @Column(name = "t_n_c_accpeted", nullable = false, columnDefinition = "boolean")
    private boolean tncAccepted;

    @Column(name = "is_verified", nullable = false, columnDefinition = "boolean default false")
    private Boolean isVerified = false;

    @Column(name = "generated_otp", nullable = false, length = 6, unique = true)
    private Long generatedOtp;

    /**
     * The timestamp when the user record was created.
     * This is automatically set by the database.
     */
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * The timestamp when the user record was last updated.
     * This is automatically updated by the database.
     */
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "is_logged_in", nullable = false, columnDefinition = "boolean default false")
    private boolean isLoggedIn;

}





