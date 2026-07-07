package com.example.JanConnect.services;


import com.example.JanConnect.dtos.responseDtos.AccessTokenResponse;
import com.example.JanConnect.exceptions.customExceptions.InvalidToken;
import com.example.JanConnect.models.User;
import com.example.JanConnect.security.jwt.JwtService;
import com.example.JanConnect.security.user.AppUserDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserAccessTokenService {

    private final JwtService jwtService;
    private final UserRefreshTokenService refreshTokenService;
    private final AppUserDetailsService userDetailsService;

    public UserAccessTokenService(JwtService jwtService, UserRefreshTokenService refreshTokenService, AppUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.userDetailsService = userDetailsService;
    }

    public ResponseEntity<AccessTokenResponse> getAccessToken(UUID refreshToken){
        if(refreshTokenService.isRefreshTokenValid(refreshToken)){
            User user = refreshTokenService.getUserByRefreshToken(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            return ResponseEntity.status(201).body(AccessTokenResponse.builder().accessToken(jwtService.generateAccessToken(userDetails)).build());
        }
        throw new InvalidToken("Refresh token is invalid");
    }

}
