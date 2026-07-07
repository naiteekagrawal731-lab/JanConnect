package com.example.JanConnect.security.authenticationSuccessHandler;

import com.example.JanConnect.services.OAuth2LoginService;
import com.example.JanConnect.services.UserIdentityService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
@Slf4j
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final OAuth2AuthorizedClientService clientService;
    private final UserIdentityService userIdentityService;
    private final OAuth2LoginService oAuth2LoginService;


    public OAuth2LoginSuccessHandler(OAuth2AuthorizedClientService clientService, UserIdentityService userIdentityService, OAuth2LoginService oAuth2LoginService) {
        this.clientService = clientService;
        this.userIdentityService = userIdentityService;
        this.oAuth2LoginService = oAuth2LoginService;
    }

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info("OAuth Successfull");
        OAuth2AuthenticationToken auth = (OAuth2AuthenticationToken) authentication;

        String provider = auth.getAuthorizedClientRegistrationId();
        String sub = auth.getName();

        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(provider,sub);

        Map<String,Object> attributes = auth.getPrincipal().getAttributes();

        OAuth2AccessToken accessToken = client.getAccessToken();
        OAuth2RefreshToken refreshToken = (client.getRefreshToken() != null) ? client.getRefreshToken() : null;

        Cookie[] cookies = request.getCookies();

        String frontendRedirect = "";
        for(Cookie i : cookies){
            if(i.getName().equals("frontend_redirect")){
                // Decoding the url
                frontendRedirect = URLDecoder.decode(i.getValue(), StandardCharsets.UTF_8);
                break;
            }
        }

        String email = (attributes.containsKey("email"))? attributes.get("email").toString() : null;

        userIdentityService.createNewUserIdentityByEmail(email,accessToken,refreshToken,provider,sub);

        String token = oAuth2LoginService.getRefreshToken(auth).toString();

        Cookie refreshTokenCookie = new Cookie("refresh_token",token);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3600);
        refreshTokenCookie.setHttpOnly(true);

        response.addCookie(refreshTokenCookie);

        log.info("refresh_token cookie added successfully");



        //Redirecting to frontend
        response.setContentType("text/html");
        response.getWriter().write(
                "<html><head><meta name=\"referrer\" content=\"no-referrer\"></head>" +
                        "<body><script>window.location.href='" + frontendRedirect + "';</script></body></html>"
        );
    }
}
