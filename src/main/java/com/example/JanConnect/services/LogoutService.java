package com.example.JanConnect.services;

import com.nimbusds.oauth2.sdk.token.RefreshToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class LogoutService {

    private final UserRefreshTokenService userRefreshTokenService;

    public LogoutService(UserRefreshTokenService userRefreshTokenService) {
        this.userRefreshTokenService = userRefreshTokenService;
    }

    public ResponseEntity<String> logout(HttpServletResponse response, HttpServletRequest request){
        for(Cookie c : request.getCookies()){
            if(c.getName().equals("refresh_token")){
                userRefreshTokenService.deleteRefreshToken(UUID.fromString(c.getValue()));
            }
        }

        log.info("Logging out user");

        Cookie deleteCookie = new Cookie("refresh_token", "");
        deleteCookie.setPath("/");
        deleteCookie.setHttpOnly(true);
        deleteCookie.setMaxAge(0);
        response.addCookie(deleteCookie);

        return ResponseEntity.status(202).body("Logout Successfully");
    }
}
