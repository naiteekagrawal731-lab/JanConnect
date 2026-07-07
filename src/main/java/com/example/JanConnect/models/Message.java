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
@Table(

        indexes = {
                @Index(name = "idx_appUser_seen", columnList = "app_user_id, seen"),
                @Index(name = "idx_appUser_created", columnList = "app_user_id, created_at")
        }
)
public class Message {
    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private User appUser;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String text;

    private Boolean seen;

    private LocalDateTime createdAt;

    @PrePersist
    public void create(){
        createdAt = LocalDateTime.now();
        if(seen == null){
            seen = false;
        }
    }


}
