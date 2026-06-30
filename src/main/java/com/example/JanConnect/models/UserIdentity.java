package com.example.JanConnect.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(
        name = "user_identity",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "provider"})
)
public class UserIdentity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String provider;//local,google, github etc

    private String sub;//id of user inside the provider system

}
