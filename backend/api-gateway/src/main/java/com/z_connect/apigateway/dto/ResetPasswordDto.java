package com.z_connect.apigateway.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ResetPasswordDto {

    private String password;

    @NotNull(message = "Token cannot be null")
    private String token;

}
