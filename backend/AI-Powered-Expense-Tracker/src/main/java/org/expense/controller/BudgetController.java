package org.expense.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.expense.dto.BudgetRequest;
import org.expense.dto.BudgetResponse;
import org.expense.service.BudgetService;

@RestController
@RequestMapping("/budget")
@CrossOrigin("*")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public String setBudget(
            @RequestBody BudgetRequest request) {

        return budgetService.setBudget(request);
    }

    @GetMapping
    public BudgetResponse getBudgetStatus() {

        return budgetService.getBudgetStatus();
    }
}
