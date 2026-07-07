package com.example.JanConnect.models;

import com.example.JanConnect.enums.FeedBackStatus;
import com.example.JanConnect.enums.FeedbackCategory;
import com.example.JanConnect.enums.Severity;
import com.example.JanConnect.enums.Visibility;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Entity
@Table(
        name = "feedback",
        indexes = {
                @Index(name = "idx_upvote", columnList = "upVote"),
                @Index(name = "idx_category", columnList = "category"),
                @Index(name = "idx_status", columnList = "status"),
                @Index(name = "idx_priority", columnList = "aiPriorityScore")
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
    private User appUser;

    @Column(nullable = false)
    private Boolean isValid;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private FeedBackStatus status;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    @Builder.Default
    private Long upVote = 0l;
    @OneToMany(mappedBy = "feedback",cascade = CascadeType.PERSIST)
    private List<FeedbackVote> votes;

    @Column(nullable = false, length = 250)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "feedBack")
    private List<Comment> comments;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "feedBack")
    private List<Comment> governmentComment;

    // Location
    private Double latitude;
    private Double longitude;
    private String village;
    private String ward;
    private String district;

    // Things decided by AI
    @Enumerated(EnumType.STRING)
    private FeedbackCategory category;
    private Integer aiPriorityScore;
    @Column(columnDefinition = "TEXT")
    private String transcript;
    private String language;
    @Column(columnDefinition = "TEXT")
    private String summary;
    private String department;
    @Enumerated(EnumType.STRING)
    private Severity severity;


    // Dates
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Attachment> attachments;

    @PrePersist
    public void create() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void update(){
        updatedAt = LocalDateTime.now();
    }

}
