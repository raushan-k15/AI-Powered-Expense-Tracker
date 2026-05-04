package org.expense.controller;


import java.time.LocalDate;
import java.util.List;

import org.expense.dto.ExpenseRequest;
import org.expense.entity.Expense;
import org.expense.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;


@RestController
@RequestMapping("/expenses")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public Expense addExpense(
    		@Valid @RequestBody ExpenseRequest request) {

        return expenseService.addExpense(request);
    }

    @GetMapping
    public List<Expense> getAllExpenses() {

        return expenseService.getAllExpenses();
    }
    
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody ExpenseRequest request) {

        return expenseService.updateExpense(id, request);
    }
    
    
    @DeleteMapping("/{id}")
    public String deleteExpense(
            @PathVariable Long id) {

        return expenseService.deleteExpense(id);
    }
    
    @GetMapping("/search")
    public Page<Expense> searchExpenses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        return expenseService.getExpenses(page, size, sortBy, direction);
    }
    
    @GetMapping("/keyword")
    public List<Expense> searchExpenses(
            @RequestParam String keyword) {

        return expenseService.searchExpenses(keyword);
    }
    
    @GetMapping("/filter")
    public Page<Expense> filterExpenses(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size,

            @RequestParam(required = false)
            String search,

            @RequestParam(defaultValue = "date")
            String sortBy,

            @RequestParam(defaultValue = "desc")
            String direction,

            @RequestParam(required = false)
            Double minAmount,

            @RequestParam(required = false)
            Double maxAmount,

            @RequestParam(required = false)
            LocalDate startDate,

            @RequestParam(required = false)
            LocalDate endDate) {

        return expenseService.filterExpenses(
                page,
                size,
                search,
                sortBy,
                direction,
                minAmount,
                maxAmount,
                startDate,
                endDate
        );
    }
}