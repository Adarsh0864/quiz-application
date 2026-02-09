package com.example.Quiz.service;

import com.example.Quiz.dto.AuthResponse;
import com.example.Quiz.dto.LoginRequest;
import com.example.Quiz.dto.SignupRequest;
import com.example.Quiz.model.User;
import com.example.Quiz.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered. Please login instead.");
        }

        // Validate role
        User.Role role;
        try {
            role = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Invalid role. Must be ADMIN or STUDENT.");
        }

        // Create user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, hash this!
        user.setName(request.getName());
        user.setRole(role);
        user.setCreatedAt(LocalDateTime.now());

        user = userRepository.save(user);

        return new AuthResponse(user.getId(), user.getEmail(), user.getName(),
                user.getRole().name(), "Signup successful!");
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found. Please sign up first."));

        // Check password
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password.");
        }

        // Check role matches
        User.Role requestedRole;
        try {
            requestedRole = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Invalid role. Must be ADMIN or STUDENT.");
        }

        if (user.getRole() != requestedRole) {
            throw new RuntimeException("You are registered as " + user.getRole() + ", not " + requestedRole + ".");
        }

        return new AuthResponse(user.getId(), user.getEmail(), user.getName(),
                user.getRole().name(), "Login successful!");
    }
}
