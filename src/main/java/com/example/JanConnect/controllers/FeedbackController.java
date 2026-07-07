package com.example.JanConnect.controllers;

import com.example.JanConnect.dtos.requestDtos.ChangeFeedbackStatusRequest;
import com.example.JanConnect.dtos.requestDtos.FeedbackRequest;
import com.example.JanConnect.dtos.responseDtos.CommentDto;
import com.example.JanConnect.dtos.responseDtos.FeedbackDto;
import com.example.JanConnect.services.CommentService;
import com.example.JanConnect.services.FeedbackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/feedback")
@Slf4j
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createFeedback(
            @ModelAttribute FeedbackRequest request) throws IOException {
        log.info(request.toString());

        List<MultipartFile> files = request.getAttachments();

        return feedbackService.uploadFeedback(request);
    }

    @GetMapping
    public Page<FeedbackDto> getFeedbacks(Pageable pageable){
        return feedbackService.getPublicFeedbacks(pageable);
    }

    @GetMapping("/{feedbackId}")
    public FeedbackDto getFeedbackById(@PathVariable("feedbackId")UUID id){
        return feedbackService.findFeedbackDtoById(id);
    }

    @GetMapping("/title")
    public Page<FeedbackDto> getFeedbackByTitle(@RequestParam  String title,Pageable pageable){
        return feedbackService.findFeedbackContainingTitle(title,pageable);
    }

    @GetMapping("/u")
    public Page<FeedbackDto> getFeedbackOfUser(Pageable pageable){
        return feedbackService.getUserFeedback(pageable);
    }

    @PostMapping("/change")
    public ResponseEntity<?> changeFeedbackStatus(@RequestBody ChangeFeedbackStatusRequest request){

        return feedbackService.changeStatusOfFeedback(request);
    }

    @GetMapping("/Allfeedback")
    //Can ybe access by admine only
    public Page<FeedbackDto> getAllFeedback(Pageable pageable){
        return feedbackService.findAllFeedback(pageable);
    }





}
