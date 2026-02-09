package com.example.Quiz.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI quizOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Online Quiz System API")
                        .description("REST API for creating quizzes, taking timed assessments, and evaluating scores")
                        .version("1.0.0"));
    }
}
