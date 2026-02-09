package com.example.Quiz.service;

import com.example.Quiz.dto.QuizSubmitRequest;
import com.example.Quiz.dto.ScoreResponse;
import com.example.Quiz.model.Question;
import com.example.Quiz.model.Quiz;
import com.example.Quiz.model.QuizAttempt;
import com.example.Quiz.repository.QuizAttemptRepository;
import com.example.Quiz.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository attemptRepository;

    public QuizService(QuizRepository quizRepository, QuizAttemptRepository attemptRepository) {
        this.quizRepository = quizRepository;
        this.attemptRepository = attemptRepository;
    }

    // ---- Quiz CRUD ----

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(String id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
    }

    public Quiz updateQuiz(String id, Quiz updated) {
        Quiz existing = getQuizById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setQuestions(updated.getQuestions());
        existing.setTimeLimitMinutes(updated.getTimeLimitMinutes());
        return quizRepository.save(existing);
    }

    public void deleteQuiz(String id) {
        quizRepository.deleteById(id);
    }

    // ---- Attempt / Scoring ----

    public ScoreResponse submitQuiz(String quizId, QuizSubmitRequest request) {
        Quiz quiz = getQuizById(quizId);
        List<Question> questions = quiz.getQuestions();

        int score = 0;
        for (int i = 0; i < questions.size(); i++) {
            if (i < request.getAnswers().size()
                    && request.getAnswers().get(i) == questions.get(i).getCorrectOptionIndex()) {
                score++;
            }
        }

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuizId(quizId);
        attempt.setPlayerName(request.getPlayerName());
        attempt.setAnswers(request.getAnswers());
        attempt.setScore(score);
        attempt.setTotalQuestions(questions.size());
        attempt.setSubmittedAt(LocalDateTime.now());

        attempt = attemptRepository.save(attempt);

        return new ScoreResponse(attempt.getId(), quiz.getTitle(),
                request.getPlayerName(), score, questions.size());
    }

    public List<QuizAttempt> getLeaderboard(String quizId) {
        return attemptRepository.findByQuizIdOrderByScoreDesc(quizId);
    }
}
