package com.z_connect.common.repository;

import com.z_connect.common.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM Users u WHERE u.isVerified = false AND u.createdAt < :cutoffTime")
    void deleteUnverifiedUsers(LocalDateTime cutoffTime);

}
