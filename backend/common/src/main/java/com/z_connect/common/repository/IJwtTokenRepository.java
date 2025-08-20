package com.z_connect.common.repository;

import com.z_connect.common.model.JwtToken;
import com.z_connect.common.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IJwtTokenRepository extends JpaRepository<JwtToken, Long> {

    boolean existsByToken(String token);

    Optional<JwtToken> findByUserIdAndIsActive(Users userId, Boolean isActive);

}
