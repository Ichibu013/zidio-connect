package com.z_connect.servicejob.model;


import com.z_connect.common.embeddedId.JobBookmarkId;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * Represents a job bookmark created by a candidate.
 * This entity has a composite primary key.
 * Corresponds to the 'job_bookmarks' table in the database.
 */
@Entity
@Table(name = "job_bookmarks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobBookmark {

    /**
     * The composite primary key for the JobBookmark entity.
     */
    @EmbeddedId
    private JobBookmarkId id;

    /**
     * The user (candidate) who bookmarked the job.
     */
    @ManyToOne
    @JoinColumn(name = "candidate_id", insertable = false, updatable = false)
    private Users candidate;

    /**
     * The job that was bookmarked.
     */
    @ManyToOne
    @JoinColumn(name = "job_id", insertable = false, updatable = false)
    private JobDetails job;

    /**
     * The timestamp when the job was bookmarked.
     * Automatically set upon creation.
     */
    @Column(name = "bookmarked_at", updatable = false)
    @CreationTimestamp
    private Timestamp bookmarkedAt;
}



