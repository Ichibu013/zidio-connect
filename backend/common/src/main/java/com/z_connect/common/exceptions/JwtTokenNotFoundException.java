package com.z_connect.common.exceptions;

public class JwtTokenNotFoundException extends RuntimeException {
    public JwtTokenNotFoundException(String message) {
        super(message);
    }
}
