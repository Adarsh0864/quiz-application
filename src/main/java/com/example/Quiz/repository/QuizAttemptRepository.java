package com.example.Quiz.repository;

import com.example.Quiz.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {

    List<QuizAttempt> findByQuizIdOrderByScoreDesc(String quizId);
}
