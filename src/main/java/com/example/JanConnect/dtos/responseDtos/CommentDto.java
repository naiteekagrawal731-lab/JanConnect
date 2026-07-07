package com.example.JanConnect.dtos.responseDtos;

import com.example.JanConnect.enums.CommentSection;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class CommentDto {
    private UUID id;
    private String text;
    private String createdByUser;
    private LocalDateTime createdAt;
    private CommentSection commentSection;
}
