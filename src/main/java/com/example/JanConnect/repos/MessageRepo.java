package com.example.JanConnect.repos;

import com.example.JanConnect.models.Message;
import com.example.JanConnect.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MessageRepo extends JpaRepository<Message, UUID> {

    Page<Message> findByAppUser(User appUser, Pageable pageable);
}
