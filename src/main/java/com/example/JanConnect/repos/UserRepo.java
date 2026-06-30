package com.example.JanConnect.repos;

import com.example.JanConnect.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByUsername(String username);
}
