package com.example.JanConnect.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "provider_token")
public class ProviderToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Lob
    private OAuth2AccessToken accessToken;

    @Lob
    private OAuth2RefreshToken refreshToken;

    @OneToOne
    @JoinColumn(unique = true)
    private UserIdentity userIdentity;
}
