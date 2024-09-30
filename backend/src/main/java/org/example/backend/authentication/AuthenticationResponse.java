package org.example.backend.authentication;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.example.backend.entity.Role;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthenticationResponse {
    @Builder.Default
    private boolean twoFactorRequired = false;
    private String accessToken;
    private Role role;
}
