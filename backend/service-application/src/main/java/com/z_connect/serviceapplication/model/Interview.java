package com.z_connect.serviceapplication.model;

import com.z_connect.common.enums.interviewEnums.InterviewStatus;
import com.z_connect.common.enums.interviewEnums.InterviewType;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

/**
 * Represents a scheduled interview event.
 * Corresponds to the 'interviews' table in the database.
 */
@Entity
@Table(name = "interviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    /**
     * The unique identifier for the interview record.
     * This field is the primary key and is auto-incremented.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The interview round this interview belongs to.
     * This is a many-to-one relationship to the 'interview_rounds' table.
     */
    @ManyToOne
    @JoinColumn(name = "round_id", nullable = false)
    @NotNull
    private InterviewRound interviewRound;

    /**
     * The date and time the interview is scheduled for.
     * This field cannot be null.
     */
    @Column(name = "scheduled_at", nullable = false)
    @NotNull
    private LocalDateTime scheduledAt;

    /**
     * The duration of the interview in minutes.
     * This field cannot be null.
     */
    @Column(name = "duration_minutes", nullable = false)
    @NotNull
    private Integer durationMinutes;

    /**
     * The type of interview (e.g., IN_PERSON, VIDEO_CALL).
     * Defaults to 'VIDEO_CALL'.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "interview_type")
    private InterviewType interviewType = InterviewType.VIDEO_CALL;

    /**
     * The link for the video call, if applicable.
     */
    @Column(name = "meeting_link")
    private String meetingLink;

    /**
     * The physical location for the interview, if applicable.
     */
    private String location;

    /**
     * The user who will be conducting the interview.
     * This is a many-to-one relationship to the 'users' table.
     */
    @ManyToOne
    @JoinColumn(name = "interviewer_id")
    private Users interviewer;

    /**
     * Notes from the interviewer about the interview.
     * This field uses the TEXT type in the database.
     */
    @Column(name = "interviewer_notes", columnDefinition = "TEXT")
    private String interviewerNotes;

    /**
     * Notes from the candidate about the interview.
     * This field uses the TEXT type in the database.
     */
    @Column(name = "candidate_notes", columnDefinition = "TEXT")
    private String candidateNotes;

    /**
     * The status of the interview.
     * Defaults to 'SCHEDULED'.
     */
    @Enumerated(EnumType.STRING)
    private InterviewStatus status = InterviewStatus.SCHEDULED;

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





