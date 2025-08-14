package com.z_connect.common.exceptions;

public class VerifyEmailFailedException extends RuntimeException {
    public VerifyEmailFailedException(String message) {
        super(message);
    }
}
