package com.example.JanConnect.controllers;

import com.example.JanConnect.dtos.requestDtos.AddCommentRequest;
import com.example.JanConnect.dtos.responseDtos.CommentDto;
import com.example.JanConnect.services.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/comments")
@Slf4j
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addComment(@ModelAttribute AddCommentRequest request){
        log.info("Adding comment with text = "+request.getText());
        return commentService.addComment(request);
    }

    @GetMapping
    public Page<CommentDto> getComments(@RequestParam UUID feedbackId, Pageable pageable){
        return commentService.getComments(feedbackId,pageable);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteComment(@RequestParam UUID commentId){
        return commentService.deleteComment(commentId);
    }

    //For Admin comment
    @PostMapping("/gov/add")
    public ResponseEntity<?> addGovComment(@ModelAttribute AddCommentRequest request){
        return commentService.addGovComment(request);
    }


}
