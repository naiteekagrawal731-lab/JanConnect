package com.example.JanConnect.mappers;

import com.example.JanConnect.dtos.responseDtos.MessageDto;
import com.example.JanConnect.models.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper implements MapperInt<MessageDto, Message>{
    @Override
    public MessageDto toDto(Message message) {
        return MessageDto.builder()
                .id(message.getId())
                .seen(message.getSeen())
                .text(message.getText())
                .createdAt(message.getCreatedAt())
                .title(message.getTitle())
                .build();
    }
}
