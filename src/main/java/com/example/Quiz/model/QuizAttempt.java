package com.example.Quiz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quiz_attempts")
public class QuizAttempt {

    @Id
    private String id;

    private String quizId;
    private String playerName;

    /** Index of the option the player chose for each question (same order as quiz.questions) */
    private List<Integer> answers;

    private int score;
    private int totalQuestions;

    private LocalDateTime submittedAt;
}
