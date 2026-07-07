package com.example.JanConnect.repos;


import com.example.JanConnect.models.ProviderToken;
import com.example.JanConnect.models.UserIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProviderTokenRepository extends JpaRepository<ProviderToken, UUID> {

    Optional<ProviderToken> findByUserIdentity(UserIdentity userIdentity);
}
