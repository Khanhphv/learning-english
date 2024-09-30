package org.example.backend.authentication;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.example.backend.config.JwtTokenService;
import org.example.backend.dto.ApiResponse;

import org.example.backend.dto.request.RegisterRequest;
import org.example.backend.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final JwtTokenService jwtTokenService;

    @PostMapping("/authenticate")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest, HttpServletRequest request, HttpServletResponse response) {
        AuthenticationResponse authenticationResponse = authenticationService.authenticate(authenticationRequest, response);

        if (authenticationResponse.isTwoFactorRequired()) {
            return ApiResponse.<AuthenticationResponse>builder()
                    .result(authenticationResponse)
                    .message("Two-factor authentication required")
                    .build();
        }



        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationResponse)
                .message("Authenticated")
                .build();
    }


    @PostMapping("/register")
    public ApiResponse<User> register(@RequestBody @Valid RegisterRequest registerRequest){
        return  ApiResponse.<User>builder()
                .result(authenticationService.register(registerRequest))
                .message("Register Successfully")
                .build();
    }



    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refresh(HttpServletRequest request, HttpServletResponse response){

        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.refresh(request, response))
                .message("Refresh Token Successfully")
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<Object> logout(@RequestBody LogoutRequest request, HttpServletRequest httpServletRequest){
        authenticationService.logout(request, httpServletRequest);

        return  ApiResponse.builder()
                .message("Logout Successfully")
                .build();
    }

    @PostMapping("/check-username/{username}")
    public ApiResponse<Boolean> checkUsername(@PathVariable String username){
        return ApiResponse.<Boolean>builder()
                .result(authenticationService.checkUsername(username))
                .message("Username is available")
                .build();
    }
}
