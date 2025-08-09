package com.z_connect.serviceanalytics.model;

import com.z_connect.common.enums.jobEnums.JobType;
import com.z_connect.common.model.JobCategory;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Represents a user's job search activity.
 * Corresponds to the 'search_logs' table in the database.
 */
@Entity
@Table(name = "search_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchLog {

    /**
     * The unique identifier for the search log record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user who performed the search. Can be null for anonymous searches.
     * This is a many-to-one relationship to the 'users' table.
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    /**
     * The search query entered by the user.
     */
    @Column(name = "search_query")
    private String searchQuery;

    /**
     * The category filter used in the search. Can be null.
     * This is a many-to-one relationship to the 'job_categories' table.
     */
    @ManyToOne
    @JoinColumn(name = "category_filter")
    private JobCategory categoryFilter;

    /**
     * The location filter used in the search.
     */
    @Column(name = "location_filter")
    private String locationFilter;

    /**
     * The minimum salary filter used in the search.
     */
    @Column(name = "salary_min_filter", precision = 12, scale = 2)
    private BigDecimal salaryMinFilter;

    /**
     * The maximum salary filter used in the search.
     */
    @Column(name = "salary_max_filter", precision = 12, scale = 2)
    private BigDecimal salaryMaxFilter;

    /**
     * The job type filter used in the search.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type_filter")
    private JobType jobTypeFilter;

    /**
     * A flag indicating if a remote filter was used.
     */
    @Column(name = "remote_filter")
    private Boolean remoteFilter;

    /**
     * The number of results returned by the search.
     */
    @Column(name = "results_count")
    private Integer resultsCount;

    /**
     * The timestamp when the search was performed.
     * Automatically set by the database.
     */
    @Column(name = "searched_at", updatable = false)
    @CreationTimestamp
    private Timestamp searchedAt;
}

