package org.expense.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.expense.dto.ExpenseRequest;

import org.expense.entity.Expense;
import org.expense.entity.User;

import org.expense.repository.ExpenseRepository;
import org.expense.repository.UserRepository;

import org.expense.service.ExpenseService;

import org.expense.util.ExpenseSpecification;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.data.jpa.domain.Specification;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

@Service
public class ExpenseServiceImpl
        implements ExpenseService {

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


    @Override
    public Expense addExpense(
            ExpenseRequest request) {

        User user =
                getCurrentUser();

        Expense expense =
                new Expense();

        expense.setAmount(
                request.getAmount()
        );

        expense.setCategory(
                request.getCategory()
        );

        expense.setDate(
                request.getDate()
        );

        expense.setNotes(
                request.getNotes()
        );

        expense.setUser(
                user
        );

        return expenseRepo.save(
                expense
        );

    }


    @Override
    public List<Expense> getAllExpenses() {

        User user =
                getCurrentUser();

        return expenseRepo.findByUser(
                user
        );

    }


    @Override
    public Expense updateExpense(

            Long id,

            ExpenseRequest request) {

        User user =
                getCurrentUser();

        Expense expense =

                expenseRepo.findById(id)

                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Expense not found"
                                )
                        );

        // Security check
        if (!expense.getUser()
                .getId()
                .equals(
                        user.getId()
                )) {

            throw new RuntimeException(
                    "Unauthorized access"
            );

        }

        expense.setAmount(
                request.getAmount()
        );

        expense.setCategory(
                request.getCategory()
        );

        expense.setDate(
                request.getDate()
        );

        expense.setNotes(
                request.getNotes()
        );

        return expenseRepo.save(
                expense
        );

    }


    @Override
    public String deleteExpense(
            Long id) {

        User user =
                getCurrentUser();

        Expense expense =

                expenseRepo.findById(id)

                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Expense not found"
                                )
                        );

        if (!expense.getUser()
                .getId()
                .equals(
                        user.getId()
                )) {

            throw new RuntimeException(
                    "Unauthorized access"
            );

        }

        expenseRepo.delete(
                expense
        );

        return "Expense deleted successfully";

    }


    @Override
    public Page<Expense> getExpenses(
            int page,
            int size,
            String sortBy,
            String direction) {

        if (sortBy == null || sortBy.isBlank()) {
            sortBy = "date";
        }

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable =
                PageRequest.of(page, size, sort);

        User user = getCurrentUser();

        return expenseRepo.findByUser(
                user,
                pageable
        );
    }
    @Override
    public List<Expense> searchExpenses(
            String keyword) {

        User user =
                getCurrentUser();

        return expenseRepo

                .findByUserAndCategoryContainingIgnoreCaseOrUserAndNotesContainingIgnoreCase(

                        user,

                        keyword,

                        user,

                        keyword

                );

    }


    @Override
    public Page<Expense> filterExpenses(

            int page,
            int size,
            String search,
            String sortBy,
            String direction,
            Double minAmount,
            Double maxAmount,
            LocalDate startDate,
            LocalDate endDate) {

        User user = getCurrentUser();

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        sort
                );

        Specification<Expense> spec =
                Specification.where(

                        (root, query, cb) ->

                                cb.equal(
                                        root.get("user"),
                                        user
                                )

                );

        // Search by category OR notes
        if (search != null && !search.trim().isEmpty()) {

            spec = spec.and(

                    (root, query, cb) ->

                            cb.or(

                                    cb.like(

                                            cb.lower(
                                                    root.get("category")
                                            ),

                                            "%" + search.toLowerCase() + "%"
                                    ),

                                    cb.like(

                                            cb.lower(
                                                    root.get("notes")
                                            ),

                                            "%" + search.toLowerCase() + "%"
                                    )

                            )

            );

        }

        return expenseRepo.findAll(
                spec,
                pageable
        );
    }
}