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

/**
 * The OnboardingController handles authentication and onboarding-related requests for the application.
 * It includes APIs for user login, signup, email verification, OTP management,
 * password recovery, and user logout functionalities.
 */
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

    /**
     * Authenticates a user with the provided login credentials.
     *
     * @param loginDto the login details containing email, password, and optional "remember me" flag
     * @return a ResponseEntity wrapping a GenericResponse that contains an AuthResponse object
     *         with an authentication token and associated roles on successful authentication
     */
    @PostMapping("/login")
    public ResponseEntity<GenericResponse<AuthResponse>> login(@Valid @RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(onboardingService.authenticate(loginDto));
    }

    /**
     * Handles the user signup process by accepting the user's signup details.
     *
     * @param signupDto the signup information, including user details such as firstName, lastName, email,
     *                  password, confirmation password, role, and acceptance of terms and conditions
     * @return a ResponseEntity containing a GenericResponse with a map of response details, such as success
     *         message or error details if the operation fails
     */
    @PostMapping("/signup")
    public ResponseEntity<GenericResponse<Map<String, String>>> signup(@Valid @RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(onboardingService.signup(signupDto));
    }

    /**
     * Verifies the user's email by processing the provided OTP and email address.
     *
     * @param email the email address of the user to be verified
     * @param verifyEmailDto the DTO containing the OTP required for verification
     * @return a ResponseEntity containing a GenericResponse with response details
     *         such as a success message or error details if the verification fails
     */
    @PatchMapping("/verify-email/{email}")
    public ResponseEntity<GenericResponse<Map<String, String>>> verifyEmail(@PathVariable(value = "email") String email, @RequestBody VerifyEmailDto verifyEmailDto) {
        return ResponseEntity.ok(onboardingService.verifyEmail(verifyEmailDto, email));
    }

    /**
     * Resends an OTP (One Time Password) to the user's registered email address.
     *
     * @param email the email address of the user to whom the OTP will be resent
     * @return a ResponseEntity containing a GenericResponse with a map of response details,
     *         such as a success message or error details if the operation fails
     */
    @PatchMapping("/resend-otp/{email}")
    public ResponseEntity<GenericResponse<Map<String, String>>> resendOtp(@PathVariable(value = "email") String email) {
        return ResponseEntity.ok(onboardingService.resendOtp(email));
    }

    /**
     * Initiates the forgot password process by accepting the user's email address.
     * This operation triggers a password recovery mechanism (e.g., sending a reset link or OTP).
     *
     * @param forgotPasswordDto the DTO containing the user's email address to start the password recovery process
     * @return a ResponseEntity wrapping a GenericResponse containing a map of response details,
     *         such as a success message or an error message if the operation fails
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<GenericResponse<Map<String, String>>> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        return ResponseEntity.ok(passwordService.forgotPassword(forgotPasswordDto));
    }

    /**
     * Resets the user's password using the provided reset password details. This method processes
     * the reset password request containing the necessary information, such as the old password
     * and the new password, to complete the password reset process.
     *
     * @param resetPasswordDto a DTO containing the required information for resetting the password,
     *                         such as user identifier, old password, new password, confirmation password,
     *                         or any other relevant data for the reset process
     * @return a ResponseEntity containing a GenericResponse with a map of response details,
     *         such as success message or error details if the operation fails
     */
    @PatchMapping("/reset-password")
    public ResponseEntity<GenericResponse<Map<String, String>>> resetPassword(@Valid @RequestBody ResetPasswordDto resetPasswordDto) {
        return ResponseEntity.ok(passwordService.resetPassword(resetPasswordDto));
    }

    /**
     * Logs out the currently authenticated user by terminating their session or invalidating their token.
     *
     * @return a ResponseEntity wrapping a GenericResponse containing a map of response details,
     *         such as a success message or error details if the operation fails
     */
    @PatchMapping("/logout")
    public ResponseEntity<GenericResponse<Map<String, String>>> logout() {
        return ResponseEntity.ok(onboardingService.logout());
    }
}
