package com.z_connect.serviceapplication.model;

import com.z_connect.common.enums.ApplicationStatus;
import com.z_connect.common.model.Job;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;

/**
 * Represents a job application submitted by a candidate.
 * Corresponds to the 'applications' table in the database.
 */
@Entity
@Table(name = "applications",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"candidate_id", "job_id"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    /**
     * The unique identifier for the application record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user (candidate) who submitted the application.
     * This is a many-to-one relationship to the 'users' table.
     */
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false, unique = true)
    @NotNull
    private Users candidate;

    /**
     * The job for which the application was submitted.
     * This is a many-to-one relationship to the 'jobs' table.
     */
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false, unique = true)
    @NotNull
    private Job job;

    /**
     * The current status of the application.
     * Defaults to 'APPLIED'.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    /**
     * The date the application was submitted.
     * This field cannot be null.
     */
    @Column(name = "application_date", nullable = false)
    @NotNull
    private LocalDate applicationDate;

    /**
     * A cover letter submitted with the application.
     * This field uses the TEXT type in the database.
     */
    @Column(name = "cover_letter", columnDefinition = "TEXT")
    private String coverLetter;


    /**
     * The timestamp when this record was last updated.
     * Automatically updated by the database.
     */
    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private Timestamp updatedAt;
}



