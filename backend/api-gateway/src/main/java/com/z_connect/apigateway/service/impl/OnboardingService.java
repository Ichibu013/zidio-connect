package com.z_connect.apigateway.service.impl;

import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.service.interfaces.IOnboardingService;
import com.z_connect.apigateway.service.validator.UserValidator;
import com.z_connect.common.exceptions.RegistrationFailedException;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.service.BaseService;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OnboardingService extends BaseService implements IOnboardingService {

    private final IUserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserValidator userValidator;

    public OnboardingService(GenericDtoMapper mapper,
                             GenericResponseFactory responseFactory,
                             IUserRepository userRepository,
                             PasswordEncoder passwordEncoder, UserValidator userValidator) {
        super(mapper, responseFactory);
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userValidator = userValidator;
    }

    @Override
    @Transactional
    public GenericResponse<String> signup(SignupDto signupDto) {
        log.info("SignupDto: {}", signupDto);
        if(userValidator.isEmpty(signupDto.getEmail(), signupDto.getPassword(), signupDto.getPasswordConfirm(), signupDto.getRole())) {
            log.warn("SignupDto is empty");
        }

        if(!userValidator.isValidSignupDto(signupDto)) {
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
    public GenericResponse<?> login(LoginDto loginDto) {
        return null;
    }
}
