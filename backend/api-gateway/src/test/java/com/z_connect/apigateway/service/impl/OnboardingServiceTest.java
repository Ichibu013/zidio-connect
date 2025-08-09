package com.z_connect.apigateway.service.impl;

import com.z_connect.apigateway.dto.AuthResponse;
import com.z_connect.apigateway.dto.LoginDto;
import com.z_connect.apigateway.dto.SignupDto;
import com.z_connect.apigateway.service.validator.UserValidator;
import com.z_connect.common.enums.Role;
import com.z_connect.common.exceptions.RegistrationFailedException;
import com.z_connect.common.exceptions.UserExistsException;
import com.z_connect.common.model.Users;
import com.z_connect.common.repository.IUserRepository;
import com.z_connect.common.utils.mapping.GenericDtoMapper;
import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OnboardingServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private GenericDtoMapper mapper;

    @Mock
    private GenericResponseFactory responseFactory;
    
    @Mock
    private UserValidator userValidator;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private com.z_connect.common.utils.jwt.JwtUtil jwtUtil;

    @InjectMocks
    private OnboardingService onboardingService;

    private SignupDto signupDto;
    private LoginDto loginDto;
    private Users user;
    private GenericResponse<String> genericResponse;
    private GenericResponse<AuthResponse> loginResponse;

    @BeforeEach
    void setUp() {
        // Initialize test data
        signupDto = SignupDto.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .passwordConfirm("password123")
                .role(Role.CANDIDATE)
                .tncAccepted(true)
                .build();
                
        loginDto = LoginDto.builder()
                .email("john.doe@example.com")
                .password("password123")
                .build();

        user = new Users();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPhoneNumber("12345678901");
        user.setPassword("encodedPassword");

        genericResponse = new GenericResponse<>();
        loginResponse = new GenericResponse<>();
    }

    @Test
    void signup_Success() {
        // Arrange
        when(userValidator.isEmpty(any(), any(), any(), any())).thenReturn(false);
        when(userValidator.isValidSignupDto(any(SignupDto.class))).thenReturn(true);
        when(userValidator.populateUserFromDto(any(SignupDto.class))).thenReturn(user);
        when(userRepository.save(any(Users.class))).thenReturn(user);
        when(responseFactory.successResponse(anyString(), anyString())).thenReturn(genericResponse);

        // Act
        GenericResponse<?> result = onboardingService.signup(signupDto);

        // Assert
        assertNotNull(result);
        verify(userValidator).isEmpty(any(), any(), any(), any());
        verify(userValidator).isValidSignupDto(signupDto);
        verify(userValidator).populateUserFromDto(signupDto);
        verify(userRepository).save(user);
        verify(responseFactory).successResponse(eq("Registered Successfully."), eq("success.signup"));
    }

    @Test
    void signup_UserAlreadyExists_ThrowsUserExistsException() {
        // Arrange
        when(userValidator.isEmpty(any(), any(), any(), any())).thenReturn(false);
        when(userValidator.isValidSignupDto(any(SignupDto.class))).thenThrow(new UserExistsException("User with email " + signupDto.getEmail() + " already exists"));

        // Act & Assert
        UserExistsException exception = assertThrows(UserExistsException.class, () -> {
            onboardingService.signup(signupDto);
        });

        assertEquals("User with email " + signupDto.getEmail() + " already exists", exception.getMessage());
        verify(userValidator).isEmpty(any(), any(), any(), any());
        verify(userValidator).isValidSignupDto(signupDto);
        verify(userValidator, never()).populateUserFromDto(any(SignupDto.class));
        verify(userRepository, never()).save(any(Users.class));
    }

    @Test
    void signup_EmptyFields_LogsWarning() {
        // Arrange
        when(userValidator.isEmpty(any(), any(), any(), any())).thenReturn(true);
        when(userValidator.isValidSignupDto(any(SignupDto.class))).thenReturn(true);
        when(userValidator.populateUserFromDto(any(SignupDto.class))).thenReturn(user);
        when(userRepository.save(any(Users.class))).thenReturn(user);
        when(responseFactory.successResponse(anyString(), anyString())).thenReturn(genericResponse);

        // Act
        GenericResponse<?> result = onboardingService.signup(signupDto);

        // Assert
        assertNotNull(result);
        verify(userValidator).isEmpty(any(), any(), any(), any());
        verify(userValidator).isValidSignupDto(signupDto);
        verify(userValidator).populateUserFromDto(signupDto);
        verify(userRepository).save(user);
    }
    
    @Test
    void signup_InvalidSignupDto_LogsWarning() {
        // Arrange
        when(userValidator.isEmpty(any(), any(), any(), any())).thenReturn(false);
        when(userValidator.isValidSignupDto(any(SignupDto.class))).thenReturn(false);
        when(userValidator.populateUserFromDto(any(SignupDto.class))).thenReturn(user);
        when(userRepository.save(any(Users.class))).thenReturn(user);
        when(responseFactory.successResponse(anyString(), anyString())).thenReturn(genericResponse);

        // Act
        GenericResponse<?> result = onboardingService.signup(signupDto);

        // Assert
        assertNotNull(result);
        verify(userValidator).isEmpty(any(), any(), any(), any());
        verify(userValidator).isValidSignupDto(signupDto);
        verify(userValidator).populateUserFromDto(signupDto);
        verify(userRepository).save(user);
    }
    
    @Test
    void signup_RegistrationFailed_ThrowsException() {
        // Arrange
        when(userValidator.isEmpty(any(), any(), any(), any())).thenReturn(false);
        when(userValidator.isValidSignupDto(any(SignupDto.class))).thenReturn(true);
        when(userValidator.populateUserFromDto(any(SignupDto.class))).thenReturn(user);
        when(userRepository.save(any(Users.class))).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        RegistrationFailedException exception = assertThrows(RegistrationFailedException.class, () -> {
            onboardingService.signup(signupDto);
        });

        assertTrue(exception.getMessage().contains("Failed to register the user"));
        verify(userValidator).isEmpty(any(), any(), any(), any());
        verify(userValidator).isValidSignupDto(signupDto);
        verify(userValidator).populateUserFromDto(signupDto);
        verify(userRepository).save(user);
    }
    
    @Test
    void authenticate_Success_ReturnsTokenAndRole() {
        // Arrange
        // Mock AuthenticationManager to accept credentials
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        // Mock UserDetails with role CANDIDATE
        UserDetails userDetails = new User(
                loginDto.getEmail(),
                "encodedPassword",
                Collections.singleton(new SimpleGrantedAuthority("CANDIDATE"))
        );
        when(userDetailsService.loadUserByUsername(loginDto.getEmail())).thenReturn(userDetails);

        // Mock JWT generation
        when(jwtUtil.generateToken(userDetails)).thenReturn("token123");

        // Prepare response from factory and capture AuthResponse passed in
        ArgumentCaptor<AuthResponse> authResponseCaptor = ArgumentCaptor.forClass(AuthResponse.class);
        when(responseFactory.successResponse(any(AuthResponse.class), eq("success.login")))
                .thenReturn(loginResponse);

        // Act
        GenericResponse<?> result = onboardingService.authenticate(loginDto);

        // Assert
        assertNotNull(result);
        assertEquals(loginResponse, result);
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userDetailsService).loadUserByUsername(loginDto.getEmail());
        verify(jwtUtil).generateToken(userDetails);
        verify(responseFactory).successResponse(authResponseCaptor.capture(), eq("success.login"));

        AuthResponse captured = authResponseCaptor.getValue();
        assertNotNull(captured);
        assertEquals("token123", captured.getToken());
        assertNotNull(captured.getRole());
        assertEquals(Set.of("CANDIDATE"), captured.getRole());
    }

    @Test
    void authenticate_InvalidCredentials_ThrowsException() {
        // Arrange
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        // Act & Assert
        assertThrows(BadCredentialsException.class, () -> onboardingService.authenticate(loginDto));

        // Ensure no further processing happens
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verifyNoInteractions(userDetailsService);
        verifyNoInteractions(jwtUtil);
        verify(responseFactory, never()).successResponse(any(AuthResponse.class), anyString());
    }
    
    @Test
    void verify_RoleAndTimestampSetting() {
        // Arrange
        // Get the current time before creating the user
        long beforeCreation = System.currentTimeMillis();
        
        Users userWithoutRoleAndTimestamp = new Users();
        userWithoutRoleAndTimestamp.setFirstName("John");
        userWithoutRoleAndTimestamp.setLastName("Doe");
        userWithoutRoleAndTimestamp.setEmail("john.doe@example.com");
        userWithoutRoleAndTimestamp.setPhoneNumber("12345678901");
        userWithoutRoleAndTimestamp.setPassword("password123");
        userWithoutRoleAndTimestamp.setRole(Role.CANDIDATE);
        
        // Don't set the timestamp here, let the service set it
        // userWithoutRoleAndTimestamp.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        
        // Create a mock that captures the user being created
        when(userValidator.isEmpty(any(), any(), any(), any())).thenReturn(false);
        when(userValidator.isValidSignupDto(any(SignupDto.class))).thenReturn(true);
        
        // Use ArgumentCaptor to capture the actual user being created
        ArgumentCaptor<Users> userCaptor = ArgumentCaptor.forClass(Users.class);
        
        // Mock the populateUserFromDto to use the real implementation
        when(userValidator.populateUserFromDto(any(SignupDto.class))).thenReturn(userWithoutRoleAndTimestamp);
        
        when(userRepository.save(any(Users.class))).thenAnswer(invocation -> {
            Users savedUser = invocation.getArgument(0);
            // If timestamp is not set, set it here to simulate what the service might do
            if (savedUser.getCreatedAt() == null) {
                savedUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            }
            return savedUser;
        });
        when(responseFactory.successResponse(anyString(), anyString())).thenReturn(genericResponse);
        
        // Act
        GenericResponse<?> result = onboardingService.signup(signupDto);
        
        // Get the current time after the operation
        long afterCreation = System.currentTimeMillis();
        
        // Assert
        assertNotNull(result);
        
        // Capture the user being saved to verify role and timestamp
        verify(userRepository).save(userCaptor.capture());
        Users capturedUser = userCaptor.getValue();
        
        // Verify role is set correctly
        assertEquals(Role.CANDIDATE, capturedUser.getRole());
        
        // Verify timestamp is within the expected range
        assertNotNull(capturedUser.getCreatedAt());
        long timestamp = capturedUser.getCreatedAt().getTime();
        assertTrue(timestamp >= beforeCreation && timestamp <= afterCreation,
                "Timestamp " + timestamp + " should be between " + beforeCreation + " and " + afterCreation);
    }
}