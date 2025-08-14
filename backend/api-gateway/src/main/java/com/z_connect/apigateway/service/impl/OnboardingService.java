package com.z_connect.apigateway.service.impl;

import com.z_connect.apigateway.dto.AuthResponse;
import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.service.interfaces.IOnboardingService;
import com.z_connect.apigateway.service.validator.UserValidator;
import com.z_connect.common.exceptions.RegistrationFailedException;
import com.z_connect.common.exceptions.UserNotFoundException;
import com.z_connect.common.exceptions.VerifyEmailFailedException;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.service.BaseService;
import com.z_connect.common.service.EmailService;
import com.z_connect.common.utils.jwt.JwtUtil;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Slf4j
@Service
public class OnboardingService extends BaseService implements IOnboardingService {

    private final IUserRepository userRepository;

    private final UserValidator userValidator;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtUtil jwtUtil;

    private final EmailService emailService;

    private static final long OTP_GRACE_PERIOD_MINUTES = 2;

    public OnboardingService(GenericDtoMapper mapper,
                             GenericResponseFactory responseFactory,
                             IUserRepository userRepository,
                             UserValidator userValidator,
                             AuthenticationManager authenticationManager,
                             UserDetailsServiceImpl userDetailsService,
                             JwtUtil jwtUtil,
                             EmailService emailService) {
        super(mapper, responseFactory);
        this.userRepository = userRepository;
        this.userValidator = userValidator;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public GenericResponse<Map<String,String>> signup(SignupDto signupDto) {
        log.info("SignupDto: {}", signupDto);
        if (userValidator.isEmpty(signupDto.getEmail(), signupDto.getPassword(), signupDto.getPasswordConfirm(), signupDto.getRole())) {
            log.warn("SignupDto is empty");
        }

        if (!userValidator.isValidSignupDto(signupDto)) {
            log.warn("SignupDto is not valid");
        }

        try {
            final Users userToSave = userValidator.populateUserFromDto(signupDto);
            emailService.sendOTPEmail(userToSave.getEmail(), userToSave.getGeneratedOtp().toString());
            log.info("User to save: {}", userToSave);
            final Users savedUser = userRepository.save(userToSave);
            log.info("Saved user: {}", savedUser);
            return responseFactory
                    .successResponse(
                            responseMessage("Registered Successfully."),
                            "success.signup"
                    );

        } catch (Exception e) {
            log.error("Error saving user", e);
            throw new RegistrationFailedException("Failed to register the user. Please try again later. " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public GenericResponse<AuthResponse> authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());

        String jwt = jwtUtil.generateToken(userDetails);

        Set<String> role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(java.util.stream.Collectors.toSet());

        Users users = userRepository.findByEmail(loginDto.getEmail())
                .stream().filter(user -> !user.isLoggedIn()).findFirst()
                .orElseThrow(() -> new UserNotFoundException("Error finding user with email : " + loginDto.getEmail()));
        users.setLoggedIn(true);
        userRepository.save(users);
        log.info("{}logged in successfully", loginDto.getEmail());

        log.info("jwt: {}", jwt);
        log.info("role: {}", role);

        return responseFactory.successResponse(
                new AuthResponse(jwt, role),
                "success.login"
        );
    }

    @Override
    @Transactional
    public GenericResponse<Map<String,String>> verifyEmail(Long Otp, String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email : " + email));

        LocalDateTime validityTime = LocalDateTime.now().plusMinutes(OTP_GRACE_PERIOD_MINUTES);
        if (user.getCreatedAt().isAfter(validityTime)) {
            log.error("{} entered expired OTP", email);
            throw new VerifyEmailFailedException("Otp has expired .... Please request a new OTP");
        }

        if (!user.getGeneratedOtp().equals(Otp)) {
            log.error("Otp does not match");
            throw new VerifyEmailFailedException("Otp does not match");
        }

        user.setIsVerified(true);
        userRepository.save(user);
        log.info("User verified successfully");
        return responseFactory.successResponse(
                responseMessage("Email verified successfully"),
                "success.verifyEmail"
        );
    }

    @Override
    @Transactional
    public GenericResponse<Map<String, String>> resendOtp(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email : " + email));

        LocalDateTime validityTime = LocalDateTime.now().plusMinutes(OTP_GRACE_PERIOD_MINUTES);
        if (user.getCreatedAt() != null && user.getCreatedAt().isBefore(validityTime)) {
            log.info("{} entered valid OTP", email);
            throw new VerifyEmailFailedException("You have already requested a new OTP within the grace period.");
        }

        try {
            emailService.sendOTPEmail(user.getEmail(), user.getGeneratedOtp().toString());
        } catch (Exception e) {
            log.error("Error sending OTP", e);
            throw new VerifyEmailFailedException("Failed to send OTP. Please try again later. " + e.getMessage());
        }

        user.setCreatedAt(LocalDateTime.now());
        user.setGeneratedOtp(userValidator.generateOtp());
        userRepository.save(user);
        log.info("OTP resent successfully");
        return responseFactory.successResponse(
                responseMessage("New OTP has been send to your mail"),
                "success.resendOtp"
        );
    }

    private Map<String, String> responseMessage(String message) {
        return Map.of("message", message);
    }
}
