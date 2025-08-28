package com.z_connect.serviceuser.repository;

import com.z_connect.common.model.Users;
import com.z_connect.serviceuser.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for managing Resume entities.
 * This interface extends JpaRepository, providing built-in methods for CRUD operations
 * and database access of records in the "resumes" table.
 *
 * Custom Queries:
 * - Contains a method to find a Resume by a given Users entity.
 */
@Repository
public interface IResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByUser(Users user);

}
