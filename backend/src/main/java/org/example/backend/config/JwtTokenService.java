package org.example.backend.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

import org.example.backend.repository.InvalidatedTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtTokenService {
    private final InvalidatedTokenRepository invalidatedTokenRepository;

    @Value(value = "${jwt.signer-key}")
    private String jwtSecret;
    @Value(value = "${jwt.access.expiration}")
    private long accessTokenExpiration;
    @Value(value = "${jwt.refresh.expiration}")
    private long refreshTokenExpiration;

    public boolean validateToken(String token, UserDetails userDetails){
        if (token == null || token.isEmpty()) {
            return false;
        }

        final String username = extractUsername(token);
        String jti = extractClaim(token, Claims::getId);

        return (username.equals(userDetails.getUsername())
                && !isTokenExpired(token)
                && !invalidatedTokenRepository.existsById(jti));
    }




    private boolean isTokenExpired(String token) {
        return extractExpired(token).before(new Date());

    }

    private Date extractExpired(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }


    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        claims.put("Authorities", userDetails.getAuthorities());
        String jti = UUID.randomUUID().toString();
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ accessTokenExpiration*1000))
                .signWith(getSigningKey())
                .id(jti)
                .compact();

    }

    public String generateRefreshToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        claims.put("Authorities", userDetails.getAuthorities());

        String jti = UUID.randomUUID().toString();
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ refreshTokenExpiration*1000))
                .id(jti)
                .signWith(getSigningKey())
                .compact();

    }


    private SecretKey getSigningKey(){
        byte[] keyBytes = Decoders.BASE64.decode(this.jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
