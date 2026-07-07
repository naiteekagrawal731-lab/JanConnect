package com.example.JanConnect.exceptions;


import com.example.JanConnect.exceptions.customExceptions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(AccessTokenExpired.class)
    public ResponseEntity<String> accessTokenExpired(AccessTokenExpired ex){
        return ResponseEntity.status(401).body(ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidToken.class)
    public ResponseEntity<String> invalidToken(InvalidToken ex){
        return ResponseEntity.status(401).body(ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(UsernameNotFound.class)
    public ResponseEntity<String> usernameNotFound(UsernameNotFound ex){
        return ResponseEntity.status(402).body(ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(UsernameTaken.class)
    public ResponseEntity<String>  usernameTaken(UsernameTaken ex){
        return ResponseEntity.status(409).body(ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(InvalidProvider.class)
    public ResponseEntity<String> invalidProvider(InvalidProvider ex){
        return ResponseEntity.status(403).body(ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler
    public ResponseEntity<String> wrongPassword(WrongPassword ex){
        return ResponseEntity.status(401).body(ex.getMessage());
    }

    @org.springframework.web.bind.annotation.ExceptionHandler
    public ResponseEntity<String> invalidFeedbackId(InvalidFeedbackId ex){
        return ResponseEntity.status(402).body(ex.getMessage());
    }


}
