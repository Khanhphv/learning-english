package org.example.backend.authentication;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.example.backend.config.JwtTokenService;
import org.example.backend.dto.request.RegisterRequest;
import org.example.backend.entity.InvalidatedToken;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.exception.ApplicationException;
import org.example.backend.exception.ErrorCode;
import org.example.backend.mapper.UserMapper;
import org.example.backend.repository.InvalidatedTokenRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final UserMapper userMapper;


    public User register(RegisterRequest registerRequest){
        if (userRepository.existsUserByUsername(registerRequest.getUsername())){
            throw new ApplicationException(ErrorCode.USER_ALREADY_EXISTS);
        }
        User user = userMapper.toUsser(registerRequest);
        user.setRole(Role.STUDENT);
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        return userRepository.save(user);
    }


    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest, HttpServletResponse response){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        var user = userRepository.findByUsername(authenticationRequest.getUsername()).orElseThrow(() -> new ApplicationException(ErrorCode.USER_NOT_FOUND));

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenService.generateToken(user);
        String refreshToken = jwtTokenService.generateRefreshToken(user);

        setRefreshTokenCookie(refreshToken,response);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .role(user.getRole())
                .build();
    }



    public AuthenticationResponse refresh(HttpServletRequest request, HttpServletResponse response){

        Cookie[] cookies = request.getCookies();
        String refreshToken = Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .findFirst()
                .map(Cookie::getValue)
                .orElseThrow(() -> new ApplicationException(ErrorCode.INVALID_TOKEN));

        String username = jwtTokenService.extractUsername(refreshToken);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (jwtTokenService.validateToken(refreshToken, user)){
            String newAccessToken = jwtTokenService.generateToken(user);
            String newRefreshToken = jwtTokenService.generateRefreshToken(user);
            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jwtTokenService.extractClaim(refreshToken, Claims::getId))
                    .expiryDate(jwtTokenService.extractClaim(refreshToken, Claims::getExpiration))
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);

            setRefreshTokenCookie(newRefreshToken, response);

            return AuthenticationResponse.builder()
                    .accessToken(newAccessToken)
                    .role(user.getRole())
                    .build();
        }else {
            throw new ApplicationException(ErrorCode.INVALID_TOKEN);
        }
    }

    @Transactional
    public void logout(LogoutRequest request, HttpServletRequest httpServletRequest){
        String username = jwtTokenService.extractUsername(request.getToken());
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (jwtTokenService.validateToken(request.getToken(), user)){

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jwtTokenService.extractClaim(request.getToken(), Claims::getId))
                    .expiryDate(jwtTokenService.extractClaim(request.getToken(), Claims::getExpiration))
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);

            Cookie[] cookies = httpServletRequest.getCookies();
            Arrays.stream(cookies)
                    .filter(cookie -> cookie.getName().equals("refreshToken"))
                    .findFirst()
                    .ifPresent(cookie -> {
                        cookie.setMaxAge(0);
                        cookie.setPath("/");
                    });

            log.info("success");
        }else{
            throw new ApplicationException(ErrorCode.INVALID_TOKEN);
        }


    }

    public boolean checkUsername(String username){
        return userRepository.existsUserByUsername(username);
    }

    private void setRefreshTokenCookie(String refreshToken, HttpServletResponse response){
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(7 * 24 * 60 * 60);
        cookie.setPath("/");
        response.addCookie(cookie);
    }


}
