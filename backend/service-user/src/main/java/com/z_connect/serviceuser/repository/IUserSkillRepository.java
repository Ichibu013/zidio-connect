package com.z_connect.serviceuser.repository;

import com.z_connect.common.embeddedId.UserSkillId;
import com.z_connect.common.model.Users;
import com.z_connect.serviceuser.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing UserSkill entities.
 * This interface extends JpaRepository, providing built-in methods for CRUD operations
 * and database access for records in the "user_skills" table.
 *
 * Custom Queries:
 * - Includes a method to find a UserSkill record by a given Users entity.
 */
@Repository
public interface IUserSkillRepository extends JpaRepository<UserSkill, UserSkillId> {
    Optional<UserSkill> findByUser(Users users);
}
