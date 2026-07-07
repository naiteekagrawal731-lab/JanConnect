package com.example.JanConnect.services;

import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.models.FeedBack;
import com.example.JanConnect.models.FeedbackVote;
import com.example.JanConnect.models.User;
import com.example.JanConnect.repos.FeedbackVoteRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;

@Service
@Slf4j
public class FeedbackVoteService {

    private final UserService userService;
    private final FeedbackService feedbackService;
    private final FeedbackVoteRepo feedbackVoteRepo;

    public FeedbackVoteService(UserService userService, FeedbackService feedbackService, FeedbackVoteRepo feedbackVoteRepo) {
        this.userService = userService;
        this.feedbackService = feedbackService;
        this.feedbackVoteRepo = feedbackVoteRepo;
    }
    @Transactional
    public ResponseEntity<?> upVote(UUID feedbackId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));
        FeedBack feedBack = feedbackService.findFeedbackById(feedbackId);

        if(!feedbackVoteRepo.findByUserAndFeedback(user,feedBack).isEmpty()){
            log.info("User vote already exist");
            return ResponseEntity.status(409).body("Already voted");
        }
        FeedbackVote vote = FeedbackVote.builder()
                .feedback(feedBack)
                .user(user)
                .build();
        if(feedBack.getVotes() == null){
            feedBack.setVotes(new ArrayList<>());
        }
        log.info("Adding vote to feedback");
        feedBack.getVotes().add(vote);
        feedBack.setUpVote(feedBack.getUpVote()+1);
        feedbackService.updateFeedback(feedBack);
        feedbackVoteRepo.save(vote);

        return ResponseEntity.status(201).body("Upvote successfull");
    }
}
