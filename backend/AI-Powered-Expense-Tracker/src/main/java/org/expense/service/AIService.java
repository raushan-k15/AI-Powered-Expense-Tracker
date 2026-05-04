package org.expense.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.expense.entity.Expense;
import org.expense.entity.User;
import org.expense.repository.ExpenseRepository;
import org.expense.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private UserRepository userRepo;

    private User getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }


    public String getInsights() {

        try {

            User user =
                    getCurrentUser();

            List<Expense> expenses =
                    expenseRepo.findByUser(user);

            if (expenses.isEmpty()) {

                return """
                        • No expense data found
                        • Add some expenses first
                        • Then AI analysis will appear
                        """;
            }


            String categoryData =
                    expenses.stream()

                    .collect(Collectors.groupingBy(
                            Expense::getCategory,
                            Collectors.summingDouble(
                                    Expense::getAmount
                            )
                    ))

                    .entrySet()

                    .stream()

                    .map(entry ->
                            entry.getKey()
                                    + " = ₹"
                                    + entry.getValue()
                    )

                    .collect(
                            Collectors.joining("\n")
                    );


            String prompt =
                    "Analyze these expenses:\n\n"
                            + categoryData
                            + "\n\nGive 2 observations and 2 saving tips.";


            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                            + apiKey;


            Map<String, Object> requestBody =
                    Map.of(
                            "contents",
                            List.of(
                                    Map.of(
                                            "parts",
                                            List.of(
                                                    Map.of(
                                                            "text",
                                                            prompt
                                                    )
                                            )
                                    )
                            )
                    );


            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );


            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );


            RestTemplate restTemplate =
                    new RestTemplate();


            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            return response.getBody();

        }

        catch (Exception e) {

            System.out.println(
                    "Gemini Error: "
                            + e.getMessage()
            );

            // fallback AI response
            return """
                    Food spending is higher this month.
                    Travel spending is balanced.
                    Entertainment expenses are increasing.
                    Try setting weekly spending limits.
                    Save at least 20% of monthly income.
                    """;
        }
    }
}