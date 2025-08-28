package com.z_connect.common.repository;

import com.z_connect.common.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository interface for performing CRUD operations on the Company entity.
 * Extends JpaRepository to provide basic JPA functionalities.
 */
public interface ICompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByName(String name);
}
