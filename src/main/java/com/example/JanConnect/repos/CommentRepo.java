package com.example.JanConnect.repos;

import com.example.JanConnect.models.Comment;
import com.example.JanConnect.models.FeedBack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentRepo extends JpaRepository<Comment, UUID> {

    Page<Comment> findCommentByFeedBack(FeedBack feedBack, Pageable pageable);
}
