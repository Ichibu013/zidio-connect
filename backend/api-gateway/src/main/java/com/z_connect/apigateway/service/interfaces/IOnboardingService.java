package com.z_connect.apigateway.service.interfaces;

import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.common.utils.response.GenericResponse;

public interface IOnboardingService {

    GenericResponse<?> signup(SignupDto signupDto);

    GenericResponse<?> login(LoginDto loginDto);

}
