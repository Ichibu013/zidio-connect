package com.z_connect.apigateway.service.validator;

import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.common.exceptions.InvalidPasswordException;
import com.z_connect.common.exceptions.PasswordNoMatchException;
import com.z_connect.common.exceptions.UserExistsException;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.regex.Pattern;

@Slf4j
@Component
public class UserValidator {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GenericDtoMapper mapper;

    public UserValidator(IUserRepository userRepository, PasswordEncoder passwordEncoder, GenericDtoMapper mapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
    }


    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
            "^" +                                           // Start of the string
                    "(?=.*[0-9])" +                                 // At least one digit
                    "(?=.*[a-z])" +                                 // At least one lowercase letter
                    "(?=.*[A-Z])" +                                 // At least one uppercase letter
                    "(?=.*[@#$%^&+=])" +                            // At least one special character
                    "(?=\\S+$)" +                                   // No whitespace allowed
                    ".{8,}" +                                       // Minimum 8 characters
                    "$"                                             // End of the string
    );

    public boolean isValidSignupDto(SignupDto signupDto) {
        return isEmailUnique(signupDto.getEmail()) &&
                isPasswordValid(signupDto.getPassword()) &&
                isPasswordsMatching(signupDto.getPassword(), signupDto.getPasswordConfirm());
    }

    public boolean isEmailUnique(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            log.error("User with email {} already exists", email);
            throw new UserExistsException("User with email " + email + " already exists");
        }
        return true;
    }

    public boolean isPasswordValid(String password) {
        if (!PASSWORD_PATTERN.matcher(password).matches()) {
            log.error("Password does not match the required criteria");
            throw new InvalidPasswordException(password + " does not match the required criteria.");
        }
        return true;
    }

    public boolean isPasswordsMatching(String password, String passwordConfirm) {
        if (!password.equals(passwordConfirm)) {
            log.error("Passwords do not match");
            throw new PasswordNoMatchException(password + " and " + passwordConfirm + " do not match.");
        }
        return true;
    }

    public Users populateUserFromDto(SignupDto signupDto) {
        Users user = mapper.map(signupDto, Users.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(signupDto.getRole());
        user.setUpdatedAt(LocalDateTime.now());
        user.setGeneratedOtp(generateOtp());
        return user;
    }

    public boolean isEmpty(Object... objects) {
        if (objects == null || objects.length == 0) {
            return true;
        }
        
        for (Object obj : objects) {
            if (obj == null) {
                return true;
            }
            if (obj instanceof String && ((String) obj).isEmpty()) {
                return true;
            }
        }
        
        return false;
    }

    //Generating a random OTP
    public Long generateOtp(){
        Random random = new Random();
        return (long) (100000+random.nextInt(900000));
    }
}
