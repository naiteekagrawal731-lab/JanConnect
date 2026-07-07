package com.example.JanConnect.dtos.responseDtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class MessageDto {
    private UUID id;
    private String title;
    private String text;
    private Boolean seen;
    private LocalDateTime createdAt;
}
