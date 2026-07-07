package com.example.JanConnect.configs;

import com.example.JanConnect.filters.JwtFilter;
import com.example.JanConnect.security.authenticationSuccessHandler.OAuth2LoginSuccessHandler;
import com.example.JanConnect.security.user.AppUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Slf4j
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final AppUserDetailsService userDetailsService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    public SecurityConfig(JwtFilter jwtFilter, AppUserDetailsService userDetailsService,
                          OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
        this.oAuth2LoginSuccessHandler = oAuth2LoginSuccessHandler;
    }

    @Bean
    public SecurityFilterChain updatingSecurityFilterChain(HttpSecurity http) {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sem -> sem.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                //Public url
                                "/feedback/title",
                                "/comments",
                                "/",

                                "/login",
                                "/api/auth/token",
                                "/api/login/usernamepassword/**",
                                "/api/login/usernamepassword",

                                "/public",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/error",
                                "/api/register",
                                "/api/logout",
                                // After success login brower points
                                "/.well-known/**",
                                "/favicon.ico",
                                "/login/oauth2/code/google",
                                "/feedback"

                                )
                        .permitAll()
                        .requestMatchers("/", "/index.html", "/assets/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(auth -> auth
                        .successHandler(oAuth2LoginSuccessHandler))

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .userDetailsService(userDetailsService)
                // Not redirecting to oauth but returning 401
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(authenticationEntryPoint())
                        .accessDeniedHandler(accessDeniedHandler()));

        ;

        return http.build();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return ((request, response, authException) -> {
            String endPoint = request.getRequestURI();
            log.info("User not authenticated, Denied from " + endPoint);
            response.setStatus(401);
        });
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return ((request, response, accessDeniedException) -> {
            String endPoint = request.getRequestURI();
            log.info("Access Denied from " + endPoint);
            response.setStatus(401);

        });
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
