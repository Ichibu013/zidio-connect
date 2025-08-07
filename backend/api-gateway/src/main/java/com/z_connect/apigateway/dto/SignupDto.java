package com.z_connect.apigateway.dto;

import com.z_connect.common.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String passwordConfirm;

    private Role role;

    private boolean tncAccepted;

}
