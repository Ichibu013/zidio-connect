package com.z_connect.common.embeddedId;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * Embeddable class to represent the composite primary key for the JobSkill entity.
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class JobSkillId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "skill_id")
    private Long skillId;
}
