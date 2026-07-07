package com.example.JanConnect.dtos.responseDtos;

import com.example.JanConnect.enums.FeedBackStatus;
import com.example.JanConnect.enums.FeedbackCategory;
import com.example.JanConnect.enums.Severity;
import lombok.Builder;
import lombok.Data;
import org.apache.logging.log4j.CloseableThreadContext;
import org.hibernate.engine.spi.Status;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class FeedbackDto {
    private UUID id;
    private String title;
    private String description;
    private String createdBy = "ANONOMYS";
    List<AttachmentDto> attachmentDtos;
    private String aiSummary;
    private FeedBackStatus status;
    private Long upVote;

    private Double latitude;
    private Double longitude;
    private String village;
    private String ward;
    private String district;

    private FeedbackCategory category;
    private Integer aiPriorityScore;
    private String language;

    private String department;
    private Severity severity;

    private LocalDateTime createdAt;

}
