package com.z_connect.serviceuser.repository;

import com.z_connect.common.model.Users;
import com.z_connect.serviceuser.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for performing CRUD operations on the Education entity.
 * This interface extends JpaRepository, providing built-in database access methods
 * for the Education table, such as saving, finding, updating, and deleting records.
 *
 * Custom Queries:
 * - Includes a method to find an Education record by a given Users entity.
 */
@Repository
public interface IEducationRepository extends JpaRepository<Education, Long> {
    Optional<Education> findByUsers(Users users);
}
