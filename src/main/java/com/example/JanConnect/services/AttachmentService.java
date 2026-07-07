package com.example.JanConnect.services;

import com.example.JanConnect.models.Attachment;
import com.example.JanConnect.repos.AttachmentRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AttachmentService {

    private final AttachmentRepo attachmentRepo;

    public AttachmentService(AttachmentRepo attachmentRepo) {
        this.attachmentRepo = attachmentRepo;
    }

    Attachment addAttachment(Attachment attachment){
        return attachmentRepo.save(attachment);
    }
}
