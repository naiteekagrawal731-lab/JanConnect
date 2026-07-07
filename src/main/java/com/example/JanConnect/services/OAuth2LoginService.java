package com.example.JanConnect.services;


import com.example.JanConnect.models.User;
import com.example.JanConnect.services.UserService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class OAuth2LoginService {

    private final UserService userService;
    private final UserRefreshTokenService userRefreshTokenService;

    public OAuth2LoginService(UserService userService, UserRefreshTokenService userRefreshTokenService) {
        this.userService = userService;
        this.userRefreshTokenService = userRefreshTokenService;
    }

    public UUID getRefreshToken(OAuth2AuthenticationToken token){
        String email = token.getPrincipal().getAttributes().get("email").toString();

        Optional<User> user = userService.getUserByEmail(email);
        return userRefreshTokenService.generateRefreshToken(user.get());
    }

}
