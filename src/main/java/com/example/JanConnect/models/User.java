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

    @OneToMany(mappedBy = "users")
    private List<FeedBack> feedBacks;

    private Instant lastFeedBackGiven;

    private Role role;

    //Check if break
    @OneToMany(mappedBy = "user")
    private List<UserIdentity> userIdentities;

    @Column(columnDefinition = "TEXT")
    private String password;

}
