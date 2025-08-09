package com.z_connect.serviceanalytics.model;

import com.z_connect.common.model.Job;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * Represents a record of a job being viewed.
 * Corresponds to the 'job_views' table in the database.
 */
@Entity
@Table(name = "job_views")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobView {

    /**
     * The unique identifier for the job view record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The job that was viewed.
     * Represents a many-to-one relationship to the custom 'Job' entity.
     */
    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    @NotNull
    private Job viewedJob;

    /**
     * The user who viewed the job.
     * This is a many-to-one relationship to the 'users' table and can be null for anonymous views.
     */
    @ManyToOne
    @JoinColumn(name = "viewer_id")
    private Users viewer;

    /**
     * The IP address from which the job was viewed.
     */
    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    /**
     * The user agent of the viewer's device.
     * This field uses the TEXT type in the database.
     */
    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    /**
     * The timestamp when the job was viewed.
     * Automatically set by the database.
     */
    @Column(name = "viewed_at", updatable = false)
    @CreationTimestamp
    private Timestamp viewedAt;
}

