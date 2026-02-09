package com.example.Quiz.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "quizzes")
public class Quiz {

    @Id
    private String id;
    private String title;
    private String description;
    private List<Question> questions;
    private int timeLimitMinutes;

    public Quiz() {}

    public Quiz(String id, String title, String description, List<Question> questions, int timeLimitMinutes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.questions = questions;
        this.timeLimitMinutes = timeLimitMinutes;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }

    public int getTimeLimitMinutes() { return timeLimitMinutes; }
    public void setTimeLimitMinutes(int timeLimitMinutes) { this.timeLimitMinutes = timeLimitMinutes; }
}
