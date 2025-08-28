package com.z_connect.common.repository;

import com.z_connect.common.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ISkillRepository extends JpaRepository<Skill, Long> {
    Optional<Skill> findBySkill_name(String skill);
}
