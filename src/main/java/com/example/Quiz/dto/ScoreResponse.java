package com.example.Quiz.dto;

public class ScoreResponse {
    private String attemptId;
    private String quizTitle;
    private String playerName;
    private int score;
    private int totalQuestions;

    public ScoreResponse() {}

    public ScoreResponse(String attemptId, String quizTitle, String playerName, int score, int totalQuestions) {
        this.attemptId = attemptId;
        this.quizTitle = quizTitle;
        this.playerName = playerName;
        this.score = score;
        this.totalQuestions = totalQuestions;
    }

    public String getAttemptId() { return attemptId; }
    public void setAttemptId(String attemptId) { this.attemptId = attemptId; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
}
