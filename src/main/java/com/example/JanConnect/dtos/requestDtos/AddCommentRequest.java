package com.example.JanConnect.dtos.requestDtos;

import lombok.Data;

import java.util.UUID;

@Data
public class AddCommentRequest {
    private UUID feedbackId;
    private String text;
}
