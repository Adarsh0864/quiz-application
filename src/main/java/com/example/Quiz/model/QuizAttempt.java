package com.example.Quiz.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "quiz_attempts")
public class QuizAttempt {

    @Id
    private String id;
    private String quizId;
    private String playerName;
    private List<Integer> answers;
    private int score;
    private int totalQuestions;
    private LocalDateTime submittedAt;

    public QuizAttempt() {}

    public QuizAttempt(String id, String quizId, String playerName, List<Integer> answers, int score, int totalQuestions, LocalDateTime submittedAt) {
        this.id = id;
        this.quizId = quizId;
        this.playerName = playerName;
        this.answers = answers;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.submittedAt = submittedAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getQuizId() { return quizId; }
    public void setQuizId(String quizId) { this.quizId = quizId; }

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }

    public List<Integer> getAnswers() { return answers; }
    public void setAnswers(List<Integer> answers) { this.answers = answers; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
