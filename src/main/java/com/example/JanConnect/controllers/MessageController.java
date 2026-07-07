package com.example.JanConnect.controllers;

import com.example.JanConnect.dtos.responseDtos.MessageDto;
import com.example.JanConnect.services.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/messages")
@Slf4j
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/all")
    public Page<MessageDto> findAllMessageOfUser(Pageable pageable){
        log.info("Getting mesage of user with username = "+ SecurityContextHolder.getContext().getAuthentication().getName());
        return messageService.findUserMessages(pageable);
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<MessageDto> findMessageById(@RequestParam UUID messageId){
        return messageService.findMessageById(messageId);
    }
}
