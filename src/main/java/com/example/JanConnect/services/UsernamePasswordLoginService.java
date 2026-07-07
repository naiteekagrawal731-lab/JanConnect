package com.example.JanConnect.services;

import com.example.JanConnect.dtos.requestDtos.LoginRequest;
import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.models.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class UsernamePasswordLoginService {

    private final UserRefreshTokenService userRefreshTokenService;
    private final UserService userService;
    private final HttpServletResponse response;

    public UsernamePasswordLoginService(UserRefreshTokenService userRefreshTokenService, UserService userService, HttpServletResponse response) {
        this.userRefreshTokenService = userRefreshTokenService;
        this.userService = userService;
        this.response = response;
    }


    public ResponseEntity<String> login(LoginRequest loginRequest){
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        log.info("Getting user info");

        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));

        log.info("Authentication user");
        userService.authenticateUser(user,password);

        log.info("Generating refresh token for user ");


        UUID refreshToken = userRefreshTokenService.generateRefreshToken(user);

        log.info("Refresh token generated successfully");

        Cookie refreshTokenCookie = new Cookie("refresh_token",String.valueOf(refreshToken));
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3600);
        refreshTokenCookie.setHttpOnly(true);

        response.addCookie(refreshTokenCookie);

        log.info("Successfully added refresh token as cookie");

        return ResponseEntity.ok("Login SuccessFull");
    }
}
