package com.z_connect.common.repository;

import com.z_connect.common.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<Users,Long> {
    Optional<Users> findByEmail(String email);
}
