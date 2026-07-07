package com.example.JanConnect.repos;

import com.example.JanConnect.models.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface AttachmentRepo extends JpaRepository<Attachment, UUID> {
}
