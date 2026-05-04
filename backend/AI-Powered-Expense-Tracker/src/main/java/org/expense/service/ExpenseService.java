package org.expense.service;

import java.time.LocalDate;
import java.util.List;

import org.expense.dto.ExpenseRequest;
import org.expense.entity.Expense;
import org.springframework.data.domain.Page;

public interface ExpenseService {

    Expense addExpense(ExpenseRequest request);

    List<Expense> getAllExpenses();
    
    Expense updateExpense(Long id, ExpenseRequest request);

    String deleteExpense(Long id);
    Page<Expense> getExpenses(
            int page,
            int size,
            String sortBy,
            String direction);
    
    List<Expense> searchExpenses(String keyword);
    
    Page<Expense> filterExpenses(
            int page,
            int size,
            String search,
            String sortBy,
            String direction,
            Double minAmount,
            Double maxAmount,
            LocalDate startDate,
            LocalDate endDate);

}