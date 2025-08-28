package com.z_connect.serviceuser.model;

import com.z_connect.common.enums.jobEnums.JobSearchStatus;
import com.z_connect.common.model.Company;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Represents a user profile entity that contains detailed information about a user.
 * It is linked to the 'users' table and includes information such as personal details,
 * employment preferences, job search status, and other relevant metadata.
 * This class is annotated with Hibernate and JPA annotations for ORM mapping.
 */
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
     * Represents the user associated with this user profile.
     * This is a one-to-one relationship to the 'users' table.
     * It is mandatory and references the unique identifier of a user.
     */
    @OneToOne(targetEntity = Users.class)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    /**
     * The country code for the user's phone number.
     */
    @Column(name = "country")
    private String country;

    /**
     * Represents the user's gender.
     * Stored as a string in the database in the "gender" column.
     * Common values may include "Male", "Female", "Other", or custom user-defined values.
     */
    @Column(name = "gender")
    private String gender;

    /**
     * Represents the date of birth of the user associated with this profile.
     * Stored in the database as a DATE type in the "dob" column.
     */
    @Column(name = "dob", columnDefinition = "DATE")
    private LocalDate dob;

    /**
     * The user's phone number.
     * This field is unique across all users.
     */
    @Column(name = "phone_number", length = 11, unique = true)
    private String phoneNumber;

    /**
     * The company this user is associated with.
     * This is an optional foreign key for recruiters.
     * Mapped to the 'companies' table.
     */
    @ManyToOne(targetEntity = Company.class)
    @JoinColumn(name = "company_id")
    private Company company;

    /**
     * Indicates whether the user is considered a candidate for job opportunities.
     * This field is mandatory and cannot be null.
     * Defaults to true.
     */
    @Column(name = "is_candidate", nullable = false, columnDefinition = "boolean default true"  )
    private Boolean isCandidate = true;

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
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * The timestamp when the user record was last updated.
     * This is automatically updated by the database.
     */
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;


    /**
     * Represents the work experience associated with the user profile.
     *
     * This is a one-to-one relationship with the `WorkExperience` entity,
     * where the field is mapped by the "work_experience" attribute in the `WorkExperience` class.
     * The primary join column is "work_experience_primary".
     *
     * This field provides detailed employment history or work-related data for the user.
     */
    @OneToOne(targetEntity = WorkExperience.class, mappedBy = "work_experience")
    @JoinColumn(name = "work_experience_primary")
    private WorkExperience workExperiencePrimary;


    /**
     * Represents the education information associated with the user profile.
     *
     * This field establishes a one-to-one relationship with the `Education` entity,
     * where the association is mapped by the "education" attribute in the `Education` class.
     * The primary join column*/
    @OneToOne(targetEntity = Education.class, mappedBy = "education")
    @JoinColumn(name = "education_primary")
    private Education educationPrimary;

    /**
     * Represents the list of skills associated with the user profile.
     *
     * This is a one-to-many relationship where each user profile can have multiple
     * skills. It maps to the `user_skills` table in the database and maintains the association between a user and their skills.
     *
     * The relationship is managed through the `user_skill` foreign key in the child table.
     */
    @OneToMany(targetEntity = UserSkill.class, mappedBy = "user_skill")
    @JoinColumn(name = "user_skills")
    private List<UserSkill> userSkills;


    /**
     * Represents the primary resume associated with the user profile.
     *
     * This is a one-to-one relationship with the `Resume` entity,
     * where the association is mapped by the "resume" attribute in the `Resume` class.
     * The primary join column is "resume_primary".
     *
     * This field holds the primary resume file and its metadata for the user.
     */
    @OneToOne(targetEntity = Resume.class, mappedBy = "resume")
    @JoinColumn(name = "resume_primary")
    private Resume resumePrimary;

}
