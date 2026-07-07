package com.example.JanConnect.dtos.requestDtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class FeedbackRequest {
    private String title;
    private String description;
    private String visibility;
    private String village;
    private String ward;
    private String district;

    private Double longitude;
    private Double latitude;

    private List<MultipartFile> attachments;
}
