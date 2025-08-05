package com.z_connect.common.embeddedId;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Embeddable class to represent the composite primary key for the UserSkill entity.
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserSkillId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "candidate_id")
    private Long candidateId;

    @Column(name = "skill_id")
    private Long skillId;
}
