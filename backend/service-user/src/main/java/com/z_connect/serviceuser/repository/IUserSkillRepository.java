package com.z_connect.serviceuser.repository;

import com.z_connect.common.embeddedId.UserSkillId;
import com.z_connect.common.model.Users;
import com.z_connect.serviceuser.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserSkillRepository extends JpaRepository<UserSkill, UserSkillId> {
    Optional<UserSkill> findByUser(Users users);
}
