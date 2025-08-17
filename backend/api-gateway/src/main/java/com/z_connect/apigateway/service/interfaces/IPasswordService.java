package com.z_connect.apigateway.service.interfaces;

import com.z_connect.apigateway.dto.ForgotPasswordDto;
import com.z_connect.apigateway.dto.ResetPasswordDto;
import com.z_connect.common.utils.response.GenericResponse;

import java.util.Map;

public interface IPasswordService {

    GenericResponse<Map<String, String>> forgotPassword(ForgotPasswordDto email);

    GenericResponse<Map<String,String>> resetPassword(ResetPasswordDto resetPasswordDto);

}
