package com.z_connect.apigateway.service.impl;

import com.z_connect.apigateway.dto.AuthResponse;
import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.dto.VerifyEmailDto;
import com.z_connect.apigateway.service.interfaces.IOnboardingService;
import com.z_connect.apigateway.service.validator.UserValidator;
import com.z_connect.common.exceptions.*;
import com.z_connect.common.model.JwtToken;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IJwtTokenRepository;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

/**
 * The OnboardingService class provides functionalities for user onboarding processes,
 * including user registration, authentication, email verification, OTP-related operations,
 * and user logout management. This class implements IOnboardingService and extends BaseService.
 * It utilizes various repositories, utilities, and services to manage user onboarding tasks.
 * <p>
 * Responsibilities include:
 * - User registration via signup
 * - Authentication and generation of JWT tokens
 * - Verification of user email through OTP
 * - Resending of OTP to users
 * - User logout and associated token management
 */
@Slf4j
@Service
public class OnboardingService extends BaseService implements IOnboardingService {

    private final IUserRepository userRepository;

    private final IJwtTokenRepository jwtTokenRepository;

    private final UserValidator userValidator;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtUtil jwtUtil;

    private final EmailService emailService;

    /**
     * Grace period in minutes used for One-Time Password (OTP) related operations.
     * <p>
     * Usage:
     * - Email verification: the OTP must be used within this time window after it is generated.
     * - Resend OTP: a new OTP cannot be requested again until this period has elapsed since the last update.
     */
    private static final long OTP_GRACE_PERIOD_MINUTES = 2;

    protected OnboardingService(GenericDtoMapper mapper,
                                GenericResponseFactory responseFactory,
                                IUserRepository userRepository,
                                IJwtTokenRepository jwtTokenRepository,
                                UserValidator userValidator,
                                AuthenticationManager authenticationManager,
                                UserDetailsServiceImpl userDetailsService,
                                JwtUtil jwtUtil,
                                EmailService emailService) {
        super(mapper, responseFactory);
        this.userRepository = userRepository;
        this.jwtTokenRepository = jwtTokenRepository;
        this.userValidator = userValidator;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    /**
     * Registers a new user using the provided signup details, generates an OTP, and sends it via email.
     * <p>
     * Flow:
     * - Validates the SignupDto fields using UserValidator.
     * - Populates a Users entity, including a generated OTP.
     * - Sends the OTP to the user's email address.
     * - Persists the new user record.
     *
     * @param signupDto the payload containing email, password, password confirmation, and role
     * @return a GenericResponse carrying a success message upon registration
     * @throws RegistrationFailedException if any error occurs while saving the user or sending email
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> signup(SignupDto signupDto) {
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

    /**
     * Authenticates a user and generates a JWT token for subsequent requests.
     * <p>
     * Flow:
     * - Delegates authentication to AuthenticationManager.
     * - Loads user details and generates a JWT via JwtUtil.
     * - Marks the user as logged in.
     * - If rememberMe is enabled, persists the JWT to the database.
     *
     * @param loginDto the login payload containing email, password, and rememberMe flag
     * @return a GenericResponse containing AuthResponse with JWT and roles
     * @throws UserNotFoundException if the user cannot be found or is already logged in
     * @throws JwtSavingException    if persisting the JWT fails
     */
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

        if (loginDto.isRememberMe()) {
            try {
                log.info("Saving jwt token");
                saveJwtToken(jwt, users);
            } catch (Exception e) {
                log.error("Error saving jwt token {}", e.getMessage());
                throw new JwtSavingException("Error saving jwt token :" + e.getMessage());
            }
        }

        userRepository.save(users);
        log.info("{}logged in successfully", loginDto.getEmail());

        log.info("jwt: {}", jwt);
        log.info("role: {}", role);

        return responseFactory.successResponse(
                new AuthResponse(jwt, role),
                "success.login"
        );
    }

    /**
     * Verifies a user's email by validating the provided OTP within a specified time window.
     * <p>
     * Rules:
     * - OTP is valid only within OTP_GRACE_PERIOD_MINUTES from creation time.
     * - A mismatch or expired OTP results in a VerifyEmailFailedException.
     *
     * @param verifyEmailDto the payload containing the OTP
     * @param email          the email address of the user being verified
     * @return a GenericResponse containing a success message when verification completes
     * @throws UserNotFoundException      if the user is not found by email
     * @throws VerifyEmailFailedException if the OTP is invalid or expired
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> verifyEmail(VerifyEmailDto verifyEmailDto, String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email : " + email));

        LocalDateTime validityTime = LocalDateTime.now().plusMinutes(OTP_GRACE_PERIOD_MINUTES);
        if (user.getCreatedAt().isAfter(validityTime)) {
            log.error("{} entered expired OTP", email);
            throw new VerifyEmailFailedException("Otp has expired .... Please request a new OTP");
        }

        if (!user.getGeneratedOtp().equals(verifyEmailDto.getOtp())) {
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

    /**
     * Regenerates and sends a new OTP to the specified user's email, respecting a resend grace period.
     * <p>
     * Rules:
     * - A new OTP cannot be requested again within OTP_GRACE_PERIOD_MINUTES since the last update time.
     * - On success, a new OTP is saved and emailed to the user.
     *
     * @param email the email address of the user requesting a new OTP
     * @return a GenericResponse containing a success message upon resending
     * @throws UserNotFoundException      if the user is not found by email
     * @throws VerifyEmailFailedException if requested within the grace period or email sending fails
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> resendOtp(String email) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email : " + email));

        LocalDateTime gracePeriodEnd = user.getUpdatedAt().plusMinutes(OTP_GRACE_PERIOD_MINUTES);
        if (user.getUpdatedAt() != null && LocalDateTime.now().isBefore(gracePeriodEnd)) {
            log.error("{} requested OTP within grace period", email);
            throw new VerifyEmailFailedException("You have already requested a new OTP within the grace period.");
        }

        user.setGeneratedOtp(userValidator.generateOtp());
        user.setUpdatedAt(LocalDateTime.now());

        try {
            emailService.sendOTPEmail(user.getEmail(), user.getGeneratedOtp().toString());
        } catch (Exception e) {
            log.error("Error sending OTP for user {}", user.getEmail(), e);
            throw new VerifyEmailFailedException("Failed to send OTP. Please try again later. " + e.getMessage());
        }

        userRepository.save(user);
        log.info("OTP resent successfully");
        return responseFactory.successResponse(
                responseMessage("New OTP has been send to your mail"),
                "success.resendOtp"
        );
    }

    /**
     * Logs out the currently authenticated user by updating user state and deactivating the stored JWT token.
     * <p>
     * Flow:
     * - Retrieves the current principal from the SecurityContext.
     * - Marks the user as logged out and persists the change.
     * - Retrieves and deactivates the persisted JWT token for the user.
     *
     * @return a GenericResponse containing a logout success message
     * @throws UserNotFoundException     if no user is found for the current principal
     * @throws JwtTokenNotFoundException if no persisted token is found for the user
     */
    @Override
    @Transactional
    public GenericResponse<Map<String, String>> logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email : " + email));
        user.setLoggedIn(false);
        userRepository.save(user);

        JwtToken token = jwtTokenRepository.findByUserIdAndIsActive(user,true)
                .orElseThrow(() -> new JwtTokenNotFoundException("Token not Found for auth : " + authentication.getCredentials()));
        token.setIsActive(false);
        token.setUpdatedAt(LocalDateTime.now());
        jwtTokenRepository.save(token);

        log.info("User {} logged out", email);
        return responseFactory.successResponse(
                responseMessage("User logged out successfully"),
                "success.logout"
        );
    }

    /**
     * Persists a JWT token entity linked to the given user for long-lived sessions (remember-me).
     *
     * @param jwt  the JWT token string to persist
     * @param user the user to whom this token belongs
     */
    @Transactional
    protected void saveJwtToken(String jwt, Users user) {
        JwtToken jwtToken = new JwtToken();
        jwtToken.setUserId(user);
        jwtToken.setToken(jwt);
        jwtToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        jwtTokenRepository.save(jwtToken);
    }

}
