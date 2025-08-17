package com.z_connect.apigateway.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NotNull(message = "Email cannot be null")
public class ForgotPasswordDto {

    private String email;

}
