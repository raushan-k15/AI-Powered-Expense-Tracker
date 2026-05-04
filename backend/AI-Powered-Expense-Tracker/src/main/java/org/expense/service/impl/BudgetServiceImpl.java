package org.expense.service.impl;

import java.util.List;

import org.expense.dto.BudgetRequest;
import org.expense.dto.BudgetResponse;

import org.expense.entity.Budget;
import org.expense.entity.Expense;
import org.expense.entity.User;

import org.expense.repository.BudgetRepository;
import org.expense.repository.ExpenseRepository;
import org.expense.repository.UserRepository;

import org.expense.service.BudgetService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

@Service
public class BudgetServiceImpl
        implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepo;

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private UserRepository userRepo;


    // Current logged-in user
    private User getCurrentUser() {

        String email =

                SecurityContextHolder

                        .getContext()

                        .getAuthentication()

                        .getName();

        return userRepo.findByEmail(
                email
        ).orElseThrow(() ->

                new RuntimeException(
                        "User not found"
                )

        );

    }


    // Set Budget
    @Override
    public String setBudget(
            BudgetRequest request
    ) {

        User user =
                getCurrentUser();

        Budget budget =

                budgetRepo

                        .findByUser(
                                user
                        )

                        .orElse(
                                new Budget()
                        );

        budget.setUser(
                user
        );

        budget.setMonthlyLimit(

                request.getMonthlyLimit()

        );

        budgetRepo.save(
                budget
        );

        return "Budget Set Successfully";

    }


    // Get Budget Status
    @Override
    public BudgetResponse getBudgetStatus() {

        User user =
                getCurrentUser();

        Budget budget =

                budgetRepo

                        .findByUser(
                                user
                        )

                        .orElse(null);


        // No budget set
        if (

                budget == null

        ) {

            return new BudgetResponse(

                    0.0,

                    0.0,

                    0.0,

                    "No budget set"

            );

        }


        List<Expense> expenses =

                expenseRepo.findByUser(
                        user
                );


        double spent =

                expenses.stream()

                        .mapToDouble(
                                Expense::getAmount
                        )

                        .sum();


        double percentage =

                budget.getMonthlyLimit() > 0

                        ?

                        (

                                spent /

                                budget.getMonthlyLimit()

                        ) * 100

                        :

                        0;


        String alert =

                percentage >= 80

                        ?

                        "Warning: Budget usage crossed 80%"

                        :

                        "Budget is under control";


        return new BudgetResponse(

                budget.getMonthlyLimit(),

                spent,

                percentage,

                alert

        );

    }

}