package org.expense.repository;

import java.util.List;

import org.expense.entity.Expense;
import org.expense.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ExpenseRepository extends
        JpaRepository<Expense, Long>,
        JpaSpecificationExecutor<Expense> {

    List<Expense> findByUser(User user);

    Page<Expense> findByUser(User user, Pageable pageable);

    List<Expense>
    findByUserAndCategoryContainingIgnoreCaseOrUserAndNotesContainingIgnoreCase(
            User user1,
            String category,
            User user2,
            String notes
    );
}