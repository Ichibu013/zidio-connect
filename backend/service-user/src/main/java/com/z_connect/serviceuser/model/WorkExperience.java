package com.z_connect.serviceuser.model;


import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;

/**
 * Represents a user's work experience.
 * Corresponds to the 'work_experience' table in the database.
 */
@Entity
@Table(name = "work_experience",
        indexes = {
                @Index(name = "idx_work_experience_candidate", columnList = "candidate_id")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperience {

    /**
     * The unique identifier for the work experience record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user (candidate) associated with this work experience.
     * This is a many-to-one relationship to the 'users' table.
     */
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    @NotNull
    private Users user;

    /**
     * The job title.
     * This field cannot be null.
     */
    @Column(name = "title", nullable = false, length = 100)
    @NotNull
    private String title;

    /**
     * The name of the company.
     * This field cannot be null.
     */
    @Column(name = "company_name", nullable = false, length = 100)
    @NotNull
    private String companyName;

    /**
     * The location of the company.
     */
    @Column(name = "location", length = 100)
    private String location;

    /**
     * The start date of the work experience.
     * This field cannot be null.
     */
    @Column(name = "start_date", nullable = false)
    @NotNull
    private LocalDate startDate;

    /**
     * The end date of the work experience.
     * Can be null if the user is currently working there.
     */
    @Column(name = "end_date")
    private LocalDate endDate;

    /**
     * A flag indicating if this is the user's current job.
     * Defaults to false.
     */
    @Column(name = "is_current")
    private Boolean isCurrent = false;

    /**
     * A detailed description of the work experience.
     * This field uses the TEXT type in the database.
     */
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    /**
     * The timestamp when this record was created.
     * Automatically set by the database.
     */
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    /**
     * The timestamp when this record was last updated.
     * Automatically updated by the database.
     */
    @Column(name = "updated_at")
    @UpdateTimestamp
    private Timestamp updatedAt;
}

