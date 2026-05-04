package org.expense.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // 32+ chars required
    private static final String SECRET =

            "ExpenseTrackerJwtSecretKey2026SuperSecure123";

    private final SecretKey key =

            Keys.hmacShaKeyFor(

                    SECRET.getBytes(
                            StandardCharsets.UTF_8
                    )

            );

    public String generateToken(
            String email
    ) {

        return Jwts.builder()

                .setSubject(
                        email
                )

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(

                        new Date(

                                System.currentTimeMillis()

                                        + 86400000
                        )
                )

                .signWith(

                        key,

                        SignatureAlgorithm.HS256
                )

                .compact();

    }

    public String extractEmail(
            String token
    ) {

        Claims claims =

                Jwts.parserBuilder()

                        .setSigningKey(
                                key
                        )

                        .build()

                        .parseClaimsJws(
                                token
                        )

                        .getBody();

        return claims.getSubject();

    }

}