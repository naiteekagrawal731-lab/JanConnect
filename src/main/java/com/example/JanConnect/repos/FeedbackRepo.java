package com.example.JanConnect.repos;

import com.example.JanConnect.enums.FeedBackStatus;
import com.example.JanConnect.enums.Visibility;
import com.example.JanConnect.models.FeedBack;
import com.example.JanConnect.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeedbackRepo extends JpaRepository<FeedBack, UUID> {
    Page<FeedBack> findByVisibilityInAndIsValidAndStatus(
            List<Visibility> visibility,
            Boolean isValid,
            FeedBackStatus status,
            Pageable pageable
    );
    Page<FeedBack> findByVisibilityInAndIsValid(
            List<Visibility> visibility,
            Boolean isValid,
            Pageable pageable
    );


    Page<FeedBack> findByTitleContainingIgnoreCaseAndVisibilityInAndIsValidAndStatus(String title, List<Visibility> visibility, Boolean isValid, FeedBackStatus status, Pageable pageable);

    Page<FeedBack> findByAppUser(User appuser,Pageable pageable);

    @Query("""
    SELECT f
    FROM FeedBack f
    LEFT JOIN FETCH f.attachments
    WHERE f.id = :id
""")
    Optional<FeedBack> findDetailedById(UUID id);
}
