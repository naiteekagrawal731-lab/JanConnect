package com.example.JanConnect.exceptions.customExceptions;

public class InvalidProvider extends RuntimeException {
    public InvalidProvider(String message) {
        super(message);
    }
}
