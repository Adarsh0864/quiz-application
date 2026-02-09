package com.example.Quiz.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Request body sent by a player when submitting a quiz attempt.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizSubmitRequest {

    @NotBlank(message = "Player name is required")
    private String playerName;

    @NotEmpty(message = "Answers list cannot be empty")
    private List<Integer> answers; // chosen option index per question
}
