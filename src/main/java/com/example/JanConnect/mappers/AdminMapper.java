package com.example.JanConnect.mappers;

import com.example.JanConnect.dtos.responseDtos.AdminDto;
import com.example.JanConnect.models.User;
import org.springframework.stereotype.Component;

@Component
public class AdminMapper implements MapperInt<AdminDto, User>{
    @Override
    public AdminDto toDto(User user) {
        return AdminDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }
}
