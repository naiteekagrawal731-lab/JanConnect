package com.example.JanConnect.dtos.responseDtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Builder
@Getter
@Setter
public class AttachmentDto {
    private String fileName;
    private String type;
    private byte[] fileData;
}
