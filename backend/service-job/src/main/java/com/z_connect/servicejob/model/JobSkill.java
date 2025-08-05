package com.z_connect.servicejob.model;


import com.z_connect.common.embeddedId.JobSkillId;
import com.z_connect.common.enums.ProficiencyLevel;
import com.z_connect.common.model.Skill;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * Represents a skill required or preferred for a specific job.
 * This entity has a composite primary key composed of job_id and skill_id.
 * Corresponds to the 'job_skills' table in the database.
 */
@Entity
@Table(name = "job_skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobSkill {

    /**
     * The composite primary key for the JobSkill entity.
     */
    @EmbeddedId
    private JobSkillId id;

    /**
     * The job associated with this skill.
     */
    @ManyToOne
    @JoinColumn(name = "job_id", insertable = false, updatable = false)
    private JobDetails job;

    /**
     * The skill itself.
     */
    @ManyToOne
    @JoinColumn(name = "skill_id", insertable = false, updatable = false)
    private Skill skill;

    /**
     * A flag indicating if the skill is a required or preferred skill.
     * Defaults to true.
     */
    @Column(name = "is_required")
    private Boolean isRequired = true;

    /**
     * The proficiency level expected for the skill.
     * Defaults to INTERMEDIATE.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level")
    private ProficiencyLevel proficiencyLevel = ProficiencyLevel.INTERMEDIATE;

    /**
     * The timestamp when this record was created.
     * Automatically set by the database.
     */
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;
}




