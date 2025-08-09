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
 * Represents a candidate's education details.
 * Corresponds to the 'education' table in the database.
 */
@Entity
@Table(name = "education")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {

    /**
     * The unique identifier for the education record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The users (candidate) associated with this education record.
     * This is a many-to-one relationship to the 'users' table.
     */
    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    @NotNull
    private Users users;

    /**
     * The degree obtained.
     * This field cannot be null.
     */
    @Column(name = "degree", nullable = false, length = 100)
    @NotNull
    private String degree;

    /**
     * The name of the educational institution.
     * This field cannot be null.
     */
    @Column(name = "institution", nullable = false, length = 100)
    @NotNull
    private String institution;

    /**
     * The major or field of study.
     */
    @Column(name = "major", length = 100)
    private String major;

    /**
     * The start date of the education.
     * This field cannot be null.
     */
    @Column(name = "start_date", nullable = false)
    @NotNull
    private LocalDate startDate;

    /**
     * The end date of the education.
     * Can be null if the users is still studying.
     */
    @Column(name = "end_date")
    private LocalDate endDate;

    /**
     * The grade or GPA obtained.
     */
    @Column(name = "gpa_grade", length = 20)
    private String grade;

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

