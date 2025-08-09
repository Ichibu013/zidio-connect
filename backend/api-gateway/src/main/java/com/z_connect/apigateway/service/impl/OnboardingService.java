package com.z_connect.apigateway.service.impl;

import com.z_connect.apigateway.dto.AuthResponse;
import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.service.interfaces.IOnboardingService;
import com.z_connect.apigateway.service.validator.UserValidator;
import com.z_connect.common.exceptions.RegistrationFailedException;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.service.BaseService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
public class OnboardingService extends BaseService implements IOnboardingService {

    private final IUserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserValidator userValidator;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    private final JwtUtil jwtUtil;

    public OnboardingService(GenericDtoMapper mapper,
                             GenericResponseFactory responseFactory,
                             IUserRepository userRepository,
                             PasswordEncoder passwordEncoder,
                             UserValidator userValidator,
                             AuthenticationManager authenticationManager,
                             UserDetailsServiceImpl userDetailsService,
                             JwtUtil jwtUtil) {
        super(mapper, responseFactory);
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userValidator = userValidator;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    @Transactional
    public GenericResponse<String> signup(SignupDto signupDto) {
        log.info("SignupDto: {}", signupDto);
        if (userValidator.isEmpty(signupDto.getEmail(), signupDto.getPassword(), signupDto.getPasswordConfirm(), signupDto.getRole())) {
            log.warn("SignupDto is empty");
        }

        if (!userValidator.isValidSignupDto(signupDto)) {
            log.warn("SignupDto is not valid");
        }

        try {
            final Users userToSave = userValidator.populateUserFromDto(signupDto);
            log.info("User to save: {}", userToSave);
            final Users savedUser = userRepository.save(userToSave);
            log.info("Saved user: {}", savedUser);
            return responseFactory
                    .successResponse(
                            "Registered Successfully.",
                            "success.signup"
                    );

        } catch (Exception e) {
            log.error("Error saving user", e);
            throw new RegistrationFailedException("Failed to register the user. Please try again later. " + e.getMessage());
        }
    }

    @Override
    public GenericResponse<AuthResponse> authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());

        String jwt = jwtUtil.generateToken(userDetails);

        Set<String> role = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(java.util.stream.Collectors.toSet());

        log.info("jwt: {}", jwt);
        log.info("role: {}", role);

        return responseFactory.successResponse(
                new AuthResponse(jwt, role),
                "success.login"
        );
    }
}
