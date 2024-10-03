package org.example.backend.config;


import lombok.RequiredArgsConstructor;

import org.example.backend.entity.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtRequestFilter jwtRequestFilter;
    private final String[] PUBLIC_URL = {"/api/v1/authenticate", "/api/v1/register", "/api/v1/check-username/**", "/api/v1/age-group/**", "/api/v1/conversation/**", "/api/v1/dialogue/**", "/api/v1/topic/**", "/api/v1/vocabulary/**"};
    private final ApplicationConfig applicationConfig;
    private final AuthenticationProvider authenticationProvider;
    private final String[] STUDENT_URL = {"/api/v1/quizzes/**"};


    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(Customizer.withDefaults());
        http.authorizeHttpRequests(
                        request -> request
                                .requestMatchers(PUBLIC_URL).permitAll()
                                .requestMatchers(STUDENT_URL).hasAuthority(Role.STUDENT.name())
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        http.logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/v1/logout"))
                .invalidateHttpSession(true));

        return http.build();
    }




}
