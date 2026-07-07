package com.example.JanConnect.models;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(
        uniqueConstraints = @UniqueConstraint(
                columnNames = {"user_id", "feedback_id"}
        )
)
public class FeedbackVote {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private User user;

    @ManyToOne
    private FeedBack feedback;

    private LocalDateTime votedAt;

    @PrePersist
    public void create(){
        votedAt = LocalDateTime.now();
    }
}
