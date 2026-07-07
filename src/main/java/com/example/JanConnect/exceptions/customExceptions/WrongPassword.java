package com.example.JanConnect.exceptions.customExceptions;

public class WrongPassword extends RuntimeException {
    public WrongPassword(String message) {
        super(message);
    }
}
