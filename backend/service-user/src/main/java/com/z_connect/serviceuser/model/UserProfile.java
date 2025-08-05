package com.z_connect.serviceuser.model;

import com.z_connect.common.enums.jobEnums.JobSearchStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "user_profile")
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    /**
     * The unique identifier for the user profile.
     * This field is the primary key and is auto-incremented by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The country code for the user's phone number.
     */
    @Column(name = "country_code")
    private String countryCode;

    /**
     * The active status of the user.
     * Defaults to true.
     */
    @Column(name = "is_active")
    private Boolean isActive = true;

    /**
     * The URL for the user's profile picture.
     */
    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    /**
     * The user's biography.
     * This field uses the TEXT type in the database.
     */
    @Column(columnDefinition = "TEXT")
    private String bio;

    /**
     * The URL to the user's LinkedIn profile.
     */
    @Column(name = "linkedin_url")
    private String linkedinUrl;

    /**
     * The URL to the user's GitHub profile.
     */
    @Column(name = "github_url")
    private String githubUrl;

    /**
     * The URL to the user's portfolio.
     */
    @Column(name = "portfolio_url")
    private String portfolioUrl;

    /**
     * The user's current location.
     */
    @Column(name = "current_location")
    private String currentLocation;

    /**
     * A flag indicating if the user is willing to relocate for a job.
     * Defaults to false.
     */
    @Column(name = "willing_to_relocate")
    private Boolean willingToRelocate = false;

    /**
     * The minimum expected salary for the user.
     */
    @Column(name = "expected_salary_min", precision = 12, scale = 2)
    private BigDecimal expectedSalaryMin;

    /**
     * The maximum expected salary for the user.
     */
    @Column(name = "expected_salary_max", precision = 12, scale = 2)
    private BigDecimal expectedSalaryMax;

    /**
     * The currency for the expected salary.
     * Defaults to 'USD'.
     */
    @Column(name = "currency")
    private String currency = "USD";

    /**
     * The date the user is available to start a new job.
     */
    @Column(name = "availability_date")
    private LocalDate availabilityDate;

    /**
     * The user's current job search status.
     * Defaults to 'ACTIVELY_LOOKING'.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "job_search_status")
    private JobSearchStatus jobSearchStatus = JobSearchStatus.ACTIVELY_LOOKING;

    /**
     * The timestamp when the user record was created.
     * This is automatically set by the database.
     */
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    /**
     * The timestamp when the user record was last updated.
     * This is automatically updated by the database.
     */
    @Column(name = "updated_at")
    @UpdateTimestamp
    private Timestamp updatedAt;

}
