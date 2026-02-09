package com.example.Quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreResponse {
    private String attemptId;
    private String quizTitle;
    private String playerName;
    private int score;
    private int totalQuestions;
}
