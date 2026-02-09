package com.example.Quiz.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private String questionText;
    private List<String> options;   // e.g. ["Paris","London","Berlin","Rome"]
    private int correctOptionIndex; // 0-based index into options
}
