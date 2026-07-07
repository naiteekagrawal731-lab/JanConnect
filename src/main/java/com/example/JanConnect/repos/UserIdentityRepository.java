package com.example.JanConnect.repos;


import com.example.JanConnect.models.User;
import com.example.JanConnect.models.UserIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserIdentityRepository extends JpaRepository<UserIdentity, UUID> {

    List<UserIdentity> findAllByUser(User user);

    Optional<UserIdentity> findByUserAndProvider(
            User user,
            String provider
    );

}
