package com.example.JanConnect.services;

import com.example.JanConnect.dtos.requestDtos.AdminUserCreationDto;
import com.example.JanConnect.dtos.requestDtos.ChangePasswordRequest;
import com.example.JanConnect.dtos.responseDtos.AdminDto;
import com.example.JanConnect.enums.Role;
import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.exceptions.customExceptions.UsernameTaken;
import com.example.JanConnect.exceptions.customExceptions.WrongPassword;
import com.example.JanConnect.mappers.AdminMapper;
import com.example.JanConnect.models.User;
import com.example.JanConnect.repos.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserService {

    private final UserRepo userRepository;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final AdminMapper adminMapper;
    //Used becuase at the time of OAuth2 the spring boot has not yet created beens
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepo userRepository, RandomPasswordGenerator randomPasswordGenerator, AdminMapper adminMapper) {
        this.userRepository = userRepository;
        this.randomPasswordGenerator = randomPasswordGenerator;
        this.adminMapper = adminMapper;
    }
    @Transactional(readOnly = true)
    Optional<User> getUserByEmail(String email){
        Optional<User> user = userRepository.getUserByEmail(email);
        return user;
    }
    @Transactional(readOnly = true)
    Optional<User> getUserByUsername(String username){
        return userRepository.getUserByUsername(username);
    }

    void createUserByEmai(String email){
        if(getUserByEmail(email).isPresent())return;
        User user = User.builder()
                .email(email)
                .username(email)
                .password(passwordEncoder.encode(randomPasswordGenerator.generatePassowrd()))
                .build();
        userRepository.save(user);
    }

    public ResponseEntity<String> changeUserPassword(ChangePasswordRequest request){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exists"));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("User = "+username+" password updated successfully");
        return ResponseEntity.accepted().body("User password changed successfully");
    }

    public void authenticateUser(User user,String password){
        String hash = passwordEncoder.encode(password);
        log.info(String.valueOf(passwordEncoder.matches(password,hash)));
        if(!passwordEncoder.matches(password,user.getPassword())){
            throw new WrongPassword("Password given by the user is wrong");
        }
    }
    @Transactional
    void updateUser(User user){
        userRepository.save(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ResponseEntity<?> createNewAdmin(AdminUserCreationDto request){
        if(userRepository.getUserByUsername(request.getUsername()).isPresent()){
            return ResponseEntity.status(409).body("Username alreaddy taken");
        }
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();
        userRepository.save(user);
        return ResponseEntity.status(201).body("User created successfully");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public ResponseEntity<?> deleteAdmin(UUID id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Invalid user id"));

        userRepository.delete(user);
        return ResponseEntity.status(201).body("User deleted successfully");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Page<AdminDto> findAdminByUsername(String username, Pageable pageable){
        return userRepository.findByUsernameContainingIgnoreCaseAndRole(username,Role.ADMIN,pageable).map(adminMapper::toDto);
    }







}
