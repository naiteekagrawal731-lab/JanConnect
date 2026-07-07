package com.example.JanConnect.exceptions.customExceptions;

public class UsernameNotFound extends RuntimeException {
  public UsernameNotFound(String message) {
    super(message);
  }
}
