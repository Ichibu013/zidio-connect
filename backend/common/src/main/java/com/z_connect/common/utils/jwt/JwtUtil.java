package com.z_connect.common.utils.jwt;

import com.z_connect.common.exceptions.AuthenticationException;
import com.z_connect.common.repository.IJwtTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Slf4j
@Component
public class JwtUtil {

    @Autowired
    private IJwtTokenRepository jwtTokenRepository;

    private static final String secretKey = "yoZW5jb2RlZCBieSBzZWN1cml0eS1taW5kZWQgYmFzZTY0LWVuY29kZXI";
    private static final long jwtExpirationMs = 3600000;


    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(normalizeToken(token))
                .getPayload();
    }

    private String normalizeToken(String token) {
        log.info("Normalizing token {}", token);
        if (token.isEmpty() || token.trim().isEmpty()) {
            throw new AuthenticationException("JWT is empty or blank");
        }
        return token;
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        String token;
        HashMap<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", userDetails.getAuthorities());
        do {
            token = generateToken(extraClaims, userDetails);
        } while (jwtTokenRepository.existsByToken(token));
        return token;
    }

    private String generateToken(HashMap<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
