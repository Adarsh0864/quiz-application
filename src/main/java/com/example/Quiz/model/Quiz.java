package com.example.Quiz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "quizzes")
public class Quiz {

    @Id
    private String id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotEmpty(message = "Quiz must have at least one question")
    private List<Question> questions;

    @Min(value = 1, message = "Time limit must be at least 1 minute")
    private int timeLimitMinutes; // duration in minutes
}
