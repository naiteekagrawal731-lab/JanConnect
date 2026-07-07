package com.example.JanConnect.security.user;

import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.models.User;
import com.example.JanConnect.repos.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepo userRepository;

    public AppUserDetailsService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));
        return new AppUserDetails(user);
    }
}
