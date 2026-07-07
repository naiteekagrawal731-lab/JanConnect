package com.example.JanConnect.services;

import com.example.JanConnect.dtos.responseDtos.MessageDto;
import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.mappers.MessageMapper;
import com.example.JanConnect.models.Message;
import com.example.JanConnect.models.User;
import com.example.JanConnect.repos.MessageRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MessageService {

    private final MessageRepo messageRepo;
    private final UserService userService;
    private final MessageMapper messageMapper;

    public MessageService(MessageRepo messageRepo, UserService userService, MessageMapper messageMapper) {
        this.messageRepo = messageRepo;
        this.userService = userService;
        this.messageMapper = messageMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    void sendMessage(String title,String text, User to){
        messageRepo.save(Message.builder()
                        .title(title)
                        .text(text)
                        .appUser(to)
                .build());
    }

    public Page<MessageDto> findUserMessages(Pageable pageable){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));

        return messageRepo.findByAppUser(user,pageable).map(messageMapper :: toDto);
    }

    public ResponseEntity<MessageDto> findMessageById(UUID id){
        Message message = messageRepo.findById(id).orElseThrow(() -> new RuntimeException("Wrong message id"));
        message.setSeen(true);
        messageRepo.save(message);
        return ResponseEntity.status(200).body(messageMapper.toDto(message));
    }

}
