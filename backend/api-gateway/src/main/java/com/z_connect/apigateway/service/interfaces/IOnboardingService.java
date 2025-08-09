package com.z_connect.apigateway.service.interfaces;

import com.z_connect.apigateway.dto.AuthResponse;
import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.common.utils.response.GenericResponse;

public interface IOnboardingService {

    GenericResponse<String> signup(SignupDto signupDto);

    GenericResponse<AuthResponse> authenticate(LoginDto loginDto);

}
