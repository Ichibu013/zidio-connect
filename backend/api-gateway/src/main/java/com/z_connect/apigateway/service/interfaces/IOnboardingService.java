package com.z_connect.apigateway.service.interfaces;

import com.z_connect.apigateway.dto.AuthResponse;
import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.dto.VerifyEmailDto;
import com.z_connect.common.utils.response.GenericResponse;

import java.util.Map;

public interface IOnboardingService {

    GenericResponse<Map<String,String>> signup(SignupDto signupDto);

    GenericResponse<AuthResponse> authenticate(LoginDto loginDto);

    GenericResponse<Map<String,String>> verifyEmail(VerifyEmailDto Otp, String email);

    GenericResponse<Map<String,String>> resendOtp(String email);

    GenericResponse<Map<String,String>> logout();
}
