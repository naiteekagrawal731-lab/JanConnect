package com.example.JanConnect.mappers;

import com.example.JanConnect.dtos.responseDtos.CommentDto;
import com.example.JanConnect.models.Comment;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper implements MapperInt<CommentDto, Comment>{
    @Override
    public CommentDto toDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .text(comment.getText())
                .createdByUser(comment.getAppUser().getUsername())
                .createdAt(comment.getCreatedAt())
                .commentSection(comment.getCommentSection())
                .build();
    }
}
