package com.z_connect.serviceuser.repository;

import com.z_connect.common.model.Users;
import com.z_connect.serviceuser.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(Users user);
}
