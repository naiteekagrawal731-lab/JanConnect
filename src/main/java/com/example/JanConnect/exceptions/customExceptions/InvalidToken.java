package com.example.JanConnect.exceptions.customExceptions;

public class InvalidToken extends RuntimeException {
    public InvalidToken(String message) {
        super(message);
    }
}
