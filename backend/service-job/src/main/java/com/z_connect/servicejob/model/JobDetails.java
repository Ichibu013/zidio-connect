package com.z_connect.servicejob.model;


import com.z_connect.common.enums.jobEnums.JobMode;
import com.z_connect.common.enums.jobEnums.JobType;
import com.z_connect.common.model.Job;
import com.z_connect.common.model.JobCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;

/**
 * Represents a job or internship posting.
 * Corresponds to the 'jobs' table in the database.
 */
@Entity
@Table(name = "jobs_details",
        indexes = {
                @Index(name = "idx_jobs_active", columnList = "is_active,post_date"),
                @Index(name = "idx_jobs_location", columnList = "location"),
                @Index(name = "idx_jobs_salary", columnList = "salary_min,salary_max")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDetails {

    /**
     * The unique identifier for the job posting.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    /**
     * The type of the job (e.g., FULL_TIME, PART_TIME).
     * This field cannot be null.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", nullable = false)
    @NotNull
    private JobType type;

    /**
     * The mode of work for the job (e.g., WORK_FROM_OFFICE, WORK_FROM_HOME, HYBRID).
     * This field uses the EnumType.STRING representation in the database,
     * is mapped to the 'job_mode' column, and cannot be null.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "job_mode", nullable = false)
    @NotNull
    private JobMode mode;


    /**
     * Represents a one-to-one relationship between the JobDetails entity and the Job entity.
     * This field links a job posting (JobDetails) to its corresponding Job entity.
     * The relationship is established using the job_id column in the database.
     * This field is mandatory and cannot be null.
     */
    @OneToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    /**
     * The category of the job posting.
     * This is a many-to-one relationship to the 'job_categories' table.
     */
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @NotNull
    private JobCategory category;

    /**
     * The title of the job posting.
     * This field cannot be null.
     */
    @Column(name = "title", nullable = false)
    @NotNull
    private String title;

    /**
     * The description of the job posting.
     * This field cannot be null and uses the TEXT type in the database.
     */
    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    @NotNull
    private String description;

    /**
     * The minimum salary for the job.
     */
    @Column(name = "salary_min", precision = 12, scale = 2)
    private BigDecimal salaryMin;

    /**
     * The maximum salary for the job.
     */
    @Column(name = "salary_max", precision = 12, scale = 2)
    private BigDecimal salaryMax;

    /**
     * The currency for the salary.
     * Defaults to 'USD'.
     */
    private String currency = "USD";

    /**
     * The location of the job.
     */
    private String location;

    /**
     * A flag indicating if remote work is allowed.
     * Defaults to false.
     */
    @Column(name = "remote_allowed")
    private Boolean remoteAllowed = false;

    /**
     * The minimum years of experience required.
     * Defaults to 0.
     */
    @Column(name = "experience_min_years")
    private Integer experienceMinYears = 0;

    /**
     * The maximum years of experience required.
     */
    @Column(name = "experience_max_years")
    private Integer experienceMaxYears;

    /**
     * The deadline for applications.
     */
    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    /**
     * The date the job was posted.
     * This field cannot be null.
     */
    @Column(name = "post_date", nullable = false)
    @NotNull
    private LocalDate postDate;

    /**
     * The active status of the job posting.
     * Defaults to true.
     */
    @Column(name = "is_active")
    private Boolean isActive = true;

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


