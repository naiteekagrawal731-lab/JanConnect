package com.example.JanConnect.dtos.requestDtos;

import lombok.Data;

import java.util.UUID;

@Data
public class ChangeFeedbackStatusRequest {
    UUID id;
    String status;
}
