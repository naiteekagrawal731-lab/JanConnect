package com.example.JanConnect.models;

import com.example.JanConnect.enums.FeedBackStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;
@Entity
@Table(
        name = "feedback",
        indexes = {
                @Index(name = "idx_priority", columnList = "upVote")
        }
)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedBack {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private UUID id;

    @ManyToOne
    private User users;

    @Column(nullable = false)
    private FeedBackStatus status;

    @Column(nullable = false)
    private Boolean isPublic;

    private Long upVote = 0l;

    private String title;

    private String description;











}
