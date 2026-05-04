package org.expense.controller;

import org.expense.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin("*")
public class AIController {

    @Autowired
    private AIService aiService;

    @GetMapping("/insights")
    public String generateInsights() {
        return aiService.getInsights();
    }
}