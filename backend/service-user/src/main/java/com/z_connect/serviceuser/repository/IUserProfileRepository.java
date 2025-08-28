package com.z_connect.serviceuser.repository;

import com.z_connect.common.enums.Role;
import com.z_connect.common.model.Users;
import com.z_connect.serviceuser.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for performing database operations on the UserProfile entity.
 * This interface extends JpaRepository, providing several built-in methods for
 * CRUD (Create, Read, Update, Delete) functionality along with custom query methods.
 */
@Repository
public interface IUserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(Users user);

    List<UserProfile> findByUser_Role(Role userRole);
}
