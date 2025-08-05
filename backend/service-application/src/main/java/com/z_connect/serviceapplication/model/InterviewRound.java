package com.z_connect.serviceapplication.model;

import com.z_connect.common.enums.interviewEnums.InterviewRoundStatus;
import com.z_connect.common.enums.interviewEnums.InterviewRoundType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

/**
 * Represents an interview round for a specific job application.
 * Corresponds to the 'interview_rounds' table in the database.
 */
@Entity
@Table(name = "interview_rounds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRound {

    /**
     * The unique identifier for the interview round record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The job application associated with this interview round.
     * This is a many-to-one relationship to the 'applications' table.
     */
    @ManyToOne
    @JoinColumn(name = "application_id", nullable = false)
    @NotNull
    private Application application;

    /**
     * The sequence number of the interview round.
     * This field cannot be null.
     */
    @Column(name = "round_number", nullable = false)
    @NotNull
    private Integer roundNumber;

    /**
     * The type of the interview round (e.g., TECHNICAL, HR).
     * This field cannot be null.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "round_type", nullable = false)
    @NotNull
    private InterviewRoundType roundType;

    /**
     * The status of the interview round.
     * Defaults to 'PENDING'.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private InterviewRoundStatus status = InterviewRoundStatus.PENDING;

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




