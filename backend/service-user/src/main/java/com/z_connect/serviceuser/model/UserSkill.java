package com.z_connect.serviceuser.model;


import com.z_connect.common.embeddedId.UserSkillId;
import com.z_connect.common.enums.ProficiencyLevel;
import com.z_connect.common.model.Skill;
import com.z_connect.common.model.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * Represents a users's skill and proficiency level.
 * This entity has a composite primary key.
 */
@Entity
@Table(name = "user_skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSkill {

    /**
     * The composite primary key for the UserSkill entity.
     */
    @EmbeddedId
    private UserSkillId id;

    /**
     * The users (candidate) associated with this skill.
     */
    @ManyToOne
    @JoinColumn(name = "candidate_id", insertable = false, updatable = false)
    private Users users;

    /**
     * The skill itself.
     */
    @ManyToOne
    @JoinColumn(name = "skill_id", insertable = false, updatable = false)
    private Skill skill;

    /**
     * The proficiency level of the skill.
     * Defaults to INTERMEDIATE.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level")
    private ProficiencyLevel proficiencyLevel = ProficiencyLevel.INTERMEDIATE;

    /**
     * The timestamp when this skill was added to the users's profile.
     * Automatically set upon creation.
     */
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;
}




