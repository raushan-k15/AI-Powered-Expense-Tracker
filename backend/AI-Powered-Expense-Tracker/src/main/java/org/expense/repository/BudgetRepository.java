package org.expense.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.expense.entity.Budget;
import org.expense.entity.User;

public interface BudgetRepository

        extends JpaRepository<
        Budget,
        Long
        > {

    Optional<Budget> findByUser(

            User user

    );

}