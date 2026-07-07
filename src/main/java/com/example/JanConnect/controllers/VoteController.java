package com.example.JanConnect.controllers;

import com.example.JanConnect.services.FeedbackVoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/vote")
public class VoteController {
    private final FeedbackVoteService feedbackVoteService;

    public VoteController(FeedbackVoteService feedbackVoteService) {
        this.feedbackVoteService = feedbackVoteService;
    }

    @PostMapping("/{feedbackId}")
    public ResponseEntity<?> upVote(@PathVariable("feedbackId")UUID id){
        return feedbackVoteService.upVote(id);
    }
}
