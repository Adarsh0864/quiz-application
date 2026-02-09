package com.example.Quiz.dto;

import java.util.List;

public class QuizSubmitRequest {

    private String playerName;
    private List<Integer> answers;

    public QuizSubmitRequest() {}

    public QuizSubmitRequest(String playerName, List<Integer> answers) {
        this.playerName = playerName;
        this.answers = answers;
    }

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }

    public List<Integer> getAnswers() { return answers; }
    public void setAnswers(List<Integer> answers) { this.answers = answers; }
}
