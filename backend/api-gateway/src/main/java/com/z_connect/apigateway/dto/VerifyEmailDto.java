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
@NotNull(message = "Otp cannot be null")
public class VerifyEmailDto {

    private Long Otp;

}
