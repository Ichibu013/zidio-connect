package com.z_connect.apigateway.api.controllers;

import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.service.interfaces.IOnboardingService;
import com.z_connect.common.utils.response.GenericResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/onboarding")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Validated
public class OnboardingController {

    private final IOnboardingService onboardingService;

    protected OnboardingController(IOnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    @PostMapping("/signup")
    public ResponseEntity<GenericResponse<String>> signup(@Valid @RequestBody SignupDto signupDto) {
        return ResponseEntity.ok(onboardingService.signup(signupDto));
    }

}
