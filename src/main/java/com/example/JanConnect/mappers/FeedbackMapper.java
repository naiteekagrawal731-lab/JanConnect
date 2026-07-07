package com.example.JanConnect.mappers;

import com.example.JanConnect.dtos.responseDtos.AttachmentDto;
import com.example.JanConnect.dtos.responseDtos.FeedbackDto;
import com.example.JanConnect.enums.Visibility;
import com.example.JanConnect.models.Attachment;
import com.example.JanConnect.models.FeedBack;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
@Component
@Slf4j
public class FeedbackMapper implements MapperInt<FeedbackDto, FeedBack>{

    @Override
    public FeedbackDto toDto(FeedBack feedBack) {
        FeedbackDto feedbackDto = FeedbackDto.builder()
                .id(feedBack.getId())
                .title(feedBack.getTitle())
                .description(feedBack.getDescription())
                .aiSummary(feedBack.getSummary())
                .status(feedBack.getStatus())
                .upVote(feedBack.getUpVote())
                .latitude(feedBack.getLatitude())
                .longitude(feedBack.getLongitude())
                .village(feedBack.getVillage())
                .district(feedBack.getDistrict())
                .ward(feedBack.getWard())
                .category(feedBack.getCategory())
                .aiPriorityScore(feedBack.getAiPriorityScore())
                .language(feedBack.getLanguage())
                .department(feedBack.getDepartment())
                .severity(feedBack.getSeverity())
                .createdAt(feedBack.getCreatedAt())
                .build();
        if(feedBack.getIsValid().equals(Visibility.PUBLIC)){
            feedbackDto.setCreatedBy(feedBack.getAppUser().getUsername());
        }
        log.info("Feedback attachments = "+feedBack.getAttachments().size()+" ,feedback name = "+ feedBack.getTitle());
        List<AttachmentDto> attachmentDtos = new ArrayList<>();
        for(Attachment attachment : feedBack.getAttachments()){
            attachmentDtos.add(AttachmentDto.builder()
                            .type(attachment.getType())
                            .fileData(attachment.getFileData())
                            .fileName(attachment.getFileName())
                    .build());
        }
        feedbackDto.setAttachmentDtos(attachmentDtos);
        return feedbackDto;
    }
}
