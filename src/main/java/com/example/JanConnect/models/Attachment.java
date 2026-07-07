package com.example.JanConnect.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String type;

    @Lob
    @Column(name = "file_data")
    private byte[] fileData;

    private String fileName;

    private Long fileSize;

    private LocalDateTime uploadedAt;

    @PrePersist
    public void create() {
        uploadedAt = LocalDateTime.now();
    }
}