package com.example.JanConnect.exceptions.customExceptions;

public class AccessTokenExpired extends RuntimeException {
  public AccessTokenExpired(String message) {
    super(message);
  }
}
