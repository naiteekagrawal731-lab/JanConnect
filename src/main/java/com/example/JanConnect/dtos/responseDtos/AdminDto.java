package com.example.JanConnect.dtos.responseDtos;

import com.example.JanConnect.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class AdminDto {
    private UUID id;
    private String username;
    private Role role;
}
