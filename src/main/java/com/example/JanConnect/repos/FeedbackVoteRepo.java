package com.example.JanConnect.repos;

import com.example.JanConnect.models.FeedBack;
import com.example.JanConnect.models.FeedbackVote;
import com.example.JanConnect.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeedbackVoteRepo extends JpaRepository<FeedbackVote, UUID> {

    Optional<FeedbackVote> findByUserAndFeedback(User user, FeedBack feedBack);
}
