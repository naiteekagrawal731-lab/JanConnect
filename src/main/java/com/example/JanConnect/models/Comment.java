package com.example.JanConnect.models;

import com.example.JanConnect.enums.CommentSection;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne()
    private FeedBack feedBack;

    @ManyToOne
    private User appUser;

    @Column(columnDefinition = "TEXT")
    private String text;

    private LocalDateTime createdAt;

    @Enumerated
    private CommentSection commentSection;

    @PrePersist
    public void create(){
        createdAt = LocalDateTime.now();
        if(commentSection ==  null){
            commentSection = CommentSection.USER;
        }
    }
}
