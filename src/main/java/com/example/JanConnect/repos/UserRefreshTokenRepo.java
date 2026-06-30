package com.example.JanConnect.repos;

import com.example.JanConnect.models.User;
import com.example.JanConnect.models.UserRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRefreshTokenRepo extends JpaRepository<UserRefreshToken, UUID> {

    Optional<UserRefreshToken> findByToken(UUID token);

    @Transactional
    void deleteByToken(UUID token);

    @Transactional
    void deleteByUser(User user);

    Optional<UserRefreshToken> findByUser(User user);
}
