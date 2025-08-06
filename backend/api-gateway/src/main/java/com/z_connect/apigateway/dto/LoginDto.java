package com.z_connect.apigateway.dto;

import com.z_connect.common.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginDto {

    private String email;
    private String password;
    private Role role;

}
