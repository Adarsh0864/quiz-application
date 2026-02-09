package com.example.Quiz.controller;

import com.example.Quiz.dto.QuizSubmitRequest;
import com.example.Quiz.dto.ScoreResponse;
import com.example.Quiz.model.Quiz;
import com.example.Quiz.model.QuizAttempt;
import com.example.Quiz.service.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
@Tag(name = "Quiz", description = "Quiz CRUD & attempt endpoints")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    // ---- CRUD ----

    @PostMapping
    @Operation(summary = "Create a new quiz")
    public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody Quiz quiz) {
        return new ResponseEntity<>(quizService.createQuiz(quiz), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a quiz by ID")
    public ResponseEntity<Quiz> getQuiz(@PathVariable String id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing quiz")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable String id, @Valid @RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.updateQuiz(id, quiz));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a quiz")
    public ResponseEntity<Void> deleteQuiz(@PathVariable String id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // ---- Attempt / Score ----

    @PostMapping("/{id}/submit")
    @Operation(summary = "Submit answers for a quiz and get score")
    public ResponseEntity<ScoreResponse> submitQuiz(
            @PathVariable String id,
            @Valid @RequestBody QuizSubmitRequest request) {
        return new ResponseEntity<>(quizService.submitQuiz(id, request), HttpStatus.OK);
    }

    @GetMapping("/{id}/leaderboard")
    @Operation(summary = "Get leaderboard for a quiz")
    public ResponseEntity<List<QuizAttempt>> getLeaderboard(@PathVariable String id) {
        return ResponseEntity.ok(quizService.getLeaderboard(id));
    }
}
