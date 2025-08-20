package com.z_connect.apigateway.service.impl;

import com.z_connect.apigateway.dto.ForgotPasswordDto;
import com.z_connect.apigateway.dto.ResetPasswordDto;
import com.z_connect.apigateway.service.interfaces.IPasswordService;
import com.z_connect.common.exceptions.EmailNotSendException;
import com.z_connect.common.model.PasswordResetToken;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IPasswordResetTokenRepository;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.service.BaseService;
import com.z_connect.common.service.EmailService;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class PasswordService extends BaseService implements IPasswordService {

    private final IUserRepository userRepository;

    private final IPasswordResetTokenRepository passwordResetTokenRepository;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    protected PasswordService(GenericDtoMapper mapper,
                              GenericResponseFactory responseFactory,
                              IUserRepository userRepository,
                              IPasswordResetTokenRepository passwordResetTokenRepository,
                              EmailService emailService, PasswordEncoder passwordEncoder) {
        super(mapper, responseFactory);
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public GenericResponse<Map<String, String>> forgotPassword(ForgotPasswordDto forgotPasswordDto) {
        userRepository.findByEmail(forgotPasswordDto.getEmail()).ifPresent(this::createPasswordResetToken);
        log.info("Password reset email sent to {}", forgotPasswordDto.getEmail());
        return responseFactory.successResponse(
                responseMessage("Password reset link send to email."),
                "success.forgotPassword"
        );
    }

    @Override
    @Transactional
    public GenericResponse<Map<String, String>> resetPassword(ResetPasswordDto resetPasswordDto) {
        String validationResult = validatePasswordResetToken(resetPasswordDto.getToken());
        if (validationResult != null) {
            return responseFactory.errorResponse(
                    responseMessage(validationResult),
                    "error.resetPassword"
            );
        }

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(resetPasswordDto.getToken());
        Users user = userRepository.findByEmail(passwordResetToken.getUser().getEmail())
                .orElseThrow();
        user.setPassword(passwordEncoder.encode(resetPasswordDto.getPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);
        log.info("Password reset for user {} successful", user.getEmail());
        return responseFactory.successResponse(
                responseMessage("Password reset successful"),
                "success.resetPassword"
        );
    }

    @Transactional
    protected void createPasswordResetToken(Users user) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(calculateExpiryDate(24 * 60));
        passwordResetTokenRepository.save(passwordResetToken);
        try {
            log.info("Sending password reset email to {}", user.getEmail());
            emailService.sendPasswordEmail(user.getEmail(), token);
        } catch (Exception e) {
            throw new EmailNotSendException("Failed to send password reset email." + e.getMessage());
        }
    }

    private String validatePasswordResetToken(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if (passwordResetToken == null) {
            return "Invalid token";
        }

        Calendar cal = Calendar.getInstance();
        if (passwordResetToken.getExpiryDate().before(cal.getTime())) {
            return "Token expired";
        }
        return null;
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        return new Date(System.currentTimeMillis() + expiryTimeInMinutes * 60000L);
    }
}
