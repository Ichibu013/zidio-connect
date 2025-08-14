package com.z_connect.common.exceptions;

import com.z_connect.common.utils.response.GenericResponse;
import com.z_connect.common.utils.response.GenericResponseFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler extends RuntimeException {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private final GenericResponseFactory genericResponseFactory;

    public GlobalExceptionHandler(GenericResponseFactory genericResponseFactory) {
        this.genericResponseFactory = genericResponseFactory;
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleUserNotFoundException(UserExistsException ex) {
        log.error("UserExistsException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.FOUND    )
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.signup.exists"
                        )
                );
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleInvalidPasswordException(InvalidPasswordException ex) {
        log.error("InvalidPasswordException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.invalid.password"
                        )
                );
    }

    @ExceptionHandler(PasswordNoMatchException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handlePasswordNoMatchException(PasswordNoMatchException ex) {
        log.error("PasswordNoMatchException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.password.no.match"
                        )
                );
    }

    @ExceptionHandler(RegistrationFailedException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleRegistrationFailedException(RegistrationFailedException ex) {
        log.error("RegistrationFailedException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.registration.failed"
                        )
                );
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleAuthenticationException(AuthenticationException ex) {
        log.error("AuthenticationException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.authentication.failed"
                        )
                );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleUserNotFoundException(UserNotFoundException ex) {
        log.error("UserNotFoundException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.user.not.found"
                        )
                );
    }

    @ExceptionHandler(VerifyEmailFailedException.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleVerifyEmailFailedException(VerifyEmailFailedException ex) {
        log.error("VerifyEmailFailedException: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_ACCEPTABLE)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.verify.email.failed"
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericResponse<Map<String, String>>> handleException(Exception ex) {
        log.error("Exception: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(genericResponseFactory
                        .errorResponse(
                                getErrorDetails(ex),
                                "error.internal.server.error"
                        )
                );
    }

    /**
     * Extracts error details from the provided exception by recursively traversing
     * the exception cause chain and returning a map containing an error message.
     * If no specific details are found in the exception cause, it defaults to the
     * message of the given exception.
     *
     * @param ex the {@link Throwable} instance from which error details are to be extracted
     * @return a {@link Map} containing error details, typically with a key "message"
     *         and its corresponding description
     */
    private Map<String, String> getErrorDetails(Throwable ex) {
        Map<String, String> errorDetails = null;
        if (ex.getCause() != null) {
            errorDetails = getErrorDetails(ex.getCause());
        }
        if (errorDetails == null) {
            errorDetails = Map.of("message", ex.getMessage());
        }
        return errorDetails;
    }

}
