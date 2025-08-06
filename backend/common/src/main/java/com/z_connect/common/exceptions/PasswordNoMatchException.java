package com.z_connect.common.exceptions;

public class PasswordNoMatchException extends RuntimeException {
    public PasswordNoMatchException(String message) {
        super(message);
    }
}
