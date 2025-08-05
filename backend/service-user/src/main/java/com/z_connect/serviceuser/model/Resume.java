package com.z_connect.serviceuser.model;


import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * Represents a candidate's resume.
 * Corresponds to the 'resumes' table in the database.
 */
@Entity
@Table(name = "resumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    /**
     * The unique identifier for the resume record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user (candidate) who owns this resume.
     * This is a many-to-one relationship to the 'users' table.
     */
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    @NotNull
    private Users user;

    /**
     * The URL where the resume file is stored.
     */
    @Column(name = "resume_url")
    private String resumeUrl;

    /**
     * The original file name of the resume.
     */
    @Column(name = "file_name")
    private String fileName;

    /**
     * A flag indicating if this is the user's primary resume.
     * Defaults to false.
     */
    @Column(name = "is_primary")
    private Boolean isPrimary = false;

    /**
     * The timestamp when the resume was uploaded.
     * Automatically set by the database.
     */
    @Column(name = "uploaded_at", updatable = false)
    @CreationTimestamp
    private Timestamp uploadedAt;
}
