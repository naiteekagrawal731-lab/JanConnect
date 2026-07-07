package com.example.JanConnect.models;

import com.example.JanConnect.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @GeneratedValue(strategy = GenerationType.UUID)
    @Id
    private UUID id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @OneToMany(mappedBy = "appUser",cascade = CascadeType.PERSIST)
    private List<FeedBack> feedBacks;

    @OneToMany(mappedBy = "appUser")
    private List<Comment> comments;

    @OneToMany(mappedBy = "appUser",cascade = CascadeType.ALL)
    private List<Message> messages;

    private Instant lastFeedBackGiven;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;

    //Check if break
    @OneToMany(mappedBy = "user")
    private List<UserIdentity> userIdentities;

    @Column(columnDefinition = "TEXT")
    private String password;

    @OneToMany(mappedBy = "user")
    private List<FeedbackVote> votes;



}
