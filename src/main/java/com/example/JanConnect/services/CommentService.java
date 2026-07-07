package com.example.JanConnect.services;

import com.example.JanConnect.dtos.requestDtos.AddCommentRequest;
import com.example.JanConnect.dtos.responseDtos.CommentDto;
import com.example.JanConnect.enums.CommentSection;
import com.example.JanConnect.enums.Visibility;
import com.example.JanConnect.exceptions.customExceptions.UsernameNotFound;
import com.example.JanConnect.mappers.CommentMapper;
import com.example.JanConnect.models.Comment;
import com.example.JanConnect.models.FeedBack;
import com.example.JanConnect.models.User;
import com.example.JanConnect.repos.CommentRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.UUID;

@Service
@Slf4j
public class CommentService {

    private final FeedbackService feedbackService;
    private final UserService userService;
    private final CommentRepo commentRepo;
    private final CommentMapper commentMapper;

    public CommentService(FeedbackService feedbackService, UserService userService, CommentRepo commentRepo, CommentMapper commentMapper) {
        this.feedbackService = feedbackService;
        this.userService = userService;
        this.commentRepo = commentRepo;
        this.commentMapper = commentMapper;
    }
    @Transactional
    public ResponseEntity<?> addComment(AddCommentRequest commentRequest){
        FeedBack feedBack = feedbackService.findFeedbackById(commentRequest.getFeedbackId());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));
        if(feedBack.getIsValid() && (feedBack.getVisibility().equals(Visibility.PUBLIC) || feedBack.getVisibility().equals(Visibility.ANONYMOUS))){
            Comment comment = Comment.builder()
                    .text(commentRequest.getText())
                    .feedBack(feedBack)
                    .appUser(user)
                    .build();
            if(feedBack.getComments() == null){
                feedBack.setComments(new ArrayList<>());
            }
            feedBack.getComments().add(comment);
            log.info(feedBack.getComments().get(0).getText());
            feedbackService.updateFeedback(feedBack);
            if(user.getComments() == null){
                user.setComments(new ArrayList<>());
            }
            user.getComments().add(comment);
            log.info("Adding user with comment");
            userService.updateUser(user);
            return ResponseEntity.status(202).body("Comment added successfully");
        }
        return ResponseEntity.status(403).body("Can't add comment to this feedback");
    }
    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    //For gov comment
    public ResponseEntity<?> addGovComment(AddCommentRequest commentRequest){
        FeedBack feedBack = feedbackService.findFeedbackById(commentRequest.getFeedbackId());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFound("User with username = "+username+" does not exist"));
        if(feedBack.getIsValid() && (feedBack.getVisibility().equals(Visibility.PUBLIC) || feedBack.getVisibility().equals(Visibility.ANONYMOUS))){
            Comment comment = Comment.builder()
                    .text(commentRequest.getText())
                    .feedBack(feedBack)
                    .appUser(user)
                    .commentSection(CommentSection.GOVERNMENT)
                    .build();
            if(feedBack.getComments() == null){
                feedBack.setComments(new ArrayList<>());
            }
            feedBack.getComments().add(comment);
            log.info(feedBack.getComments().get(0).getText());
            feedbackService.updateFeedback(feedBack);
            if(user.getComments() == null){
                user.setComments(new ArrayList<>());
            }
            user.getComments().add(comment);
            log.info("Adding user with comment");
            userService.updateUser(user);
            return ResponseEntity.status(202).body("Comment added successfully");
        }
        return ResponseEntity.status(403).body("Can't add comment to this feedback");

    }


    @Transactional
    public Page<CommentDto> getComments(UUID feedbackId, Pageable pageable){
        FeedBack feedBack = feedbackService.findFeedbackById(feedbackId);
        if(!feedBack.getIsValid() || feedBack.getVisibility().equals(Visibility.PRIVATE)){
            return null;
        }
        return commentRepo.findCommentByFeedBack(feedBack,pageable).map(commentMapper::toDto);
    }

    @Transactional
    public ResponseEntity<?> deleteComment(UUID id){
        Comment comment = commentRepo.findById(id).orElseThrow(() -> new RuntimeException("Invalid comment id"));
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if(comment.getAppUser().getUsername().equals(username)){
            commentRepo.delete(comment);
            return ResponseEntity.status(201).body("Comment successfully deleted");
        }
        return ResponseEntity.status(403).body("User not authorized to delete this comment");
    }
}
