package com.example.JanConnect.services;

import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.models.User;
import com.example.JanConnect.models.UserIdentity;
import com.example.JanConnect.repos.UserIdentityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserIdentityService {

    private final UserService userService;
    private final UserIdentityRepository userIdentityRepository;
    private final ProviderTokenService providerTokenService;
    private final UserRefreshTokenService userRefreshTokenService;

    public UserIdentityService(UserService userService, UserIdentityRepository userIdentityRepository, ProviderTokenService providerTokenService, UserRefreshTokenService userRefreshTokenService) {
        this.userService = userService;
        this.userIdentityRepository = userIdentityRepository;
        this.providerTokenService = providerTokenService;
        this.userRefreshTokenService = userRefreshTokenService;
    }

    public void createNewUserIdentityByEmail(String email, OAuth2AccessToken accessToken, OAuth2RefreshToken refreshToken,String provider,String sub){
        Optional<User> user = userService.getUserByEmail(email);
        if(user.isEmpty() || user.get() == null){
            userService.createUserByEmai(email);
            user = userService.getUserByEmail(email);
        }
        List<UserIdentity> userIdentities = userIdentityRepository.findAllByUser(user.get());
        for(UserIdentity ui : userIdentities){
            if(ui.getProvider().equals(provider)){
                providerTokenService.createNewToken(accessToken,refreshToken,ui);
                return;
            }
        }
        UserIdentity userIdentity = UserIdentity.builder()
                .sub(sub)
                .provider(provider)
                .user(user.get())
                .build();

        userIdentityRepository.save(userIdentity);

        providerTokenService.createNewToken(accessToken,refreshToken,userIdentity);

    }
    public void createNewUserIdentityByUserRefreshToken(String userRefreshToken,OAuth2AccessToken accessToken,OAuth2RefreshToken refreshToken,String provider,String sub){
        User user = userRefreshTokenService.getUserByRefreshToken(UUID.fromString(userRefreshToken));

        Optional<UserIdentity> userIdentities = userIdentityRepository.findByUserAndProvider(user,provider);

        if(userIdentities.isPresent()){
            log.info("User identity for user = "+user.getUsername()+" and provider = "+provider+" already exist");
            providerTokenService.createNewToken(accessToken,refreshToken,userIdentities.get());
            return;
        }

        log.info("Creating new useridentity for user = "+user.getUsername()+" for proviuder = "+provider);

        UserIdentity userIdentity = UserIdentity.builder()
                .sub(sub)
                .provider(provider)
                .user(user)
                .build();

        userIdentityRepository.save(userIdentity);

        providerTokenService.createNewToken(accessToken,refreshToken,userIdentity);
    }

    Optional<UserIdentity> findByUserAndProvider(User user,String provider){
        return userIdentityRepository.findByUserAndProvider(user,provider);
    }

    Optional<UserIdentity> findByUsernameAndProvider(String username,String provider){
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));

        return userIdentityRepository.findByUserAndProvider(user,provider);

    }


}
