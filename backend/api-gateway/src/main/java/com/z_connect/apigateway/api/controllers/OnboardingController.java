package com.z_connect.apigateway.api.controllers;

import com.z_connect.apigateway.dto.*;
import com.z_connect.apigateway.service.interfaces.IOnboardingService;
import com.z_connect.apigateway.service.interfaces.IPasswordService;
import com.z_connect.common.utils.response.GenericResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Validated
public class OnboardingController {

    private final IOnboardingService onboardingService;

    private final IPasswordService passwordService;

    protected OnboardingController(IOnboardingService onboardingService,
                                   IPasswordService passwordService) {
        this.onboardingService = onboardingService;
        this.passwordService = passwordService;
    }

    @PostMapping("/login")
    public ResponseEntity<GenericResponse<AuthResponse>> login(@Valid @RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(onboardingService.authenticate(loginDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<GenericResponse<Map<String, String>>> signup(@Valid @RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(onboardingService.signup(signupDto));
    }

    @PatchMapping("/verify-email/{email}")
    public ResponseEntity<GenericResponse<Map<String, String>>> verifyEmail(@PathVariable(value = "email") String email, @RequestBody VerifyEmailDto verifyEmailDto) {
        return ResponseEntity.ok(onboardingService.verifyEmail(verifyEmailDto, email));
    }

    @PatchMapping("/resend-otp/{email}")
    public ResponseEntity<GenericResponse<Map<String, String>>> resendOtp(@PathVariable(value = "email") String email) {
        return ResponseEntity.ok(onboardingService.resendOtp(email));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<GenericResponse<Map<String, String>>> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        return ResponseEntity.ok(passwordService.forgotPassword(forgotPasswordDto));
    }

    @PatchMapping("/reset-password")
    public ResponseEntity<GenericResponse<Map<String, String>>> resetPassword(@Valid @RequestBody ResetPasswordDto resetPasswordDto) {
        return ResponseEntity.ok(passwordService.resetPassword(resetPasswordDto));
    }

    @PatchMapping("/logout")
    public ResponseEntity<GenericResponse<Map<String, String>>> logout() {
        return ResponseEntity.ok(onboardingService.logout());
    }
}
