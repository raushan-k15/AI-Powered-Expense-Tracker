package org.expense.service;

import org.expense.dto.BudgetRequest;
import org.expense.dto.BudgetResponse;

public interface BudgetService {

    String setBudget(BudgetRequest request);

    BudgetResponse getBudgetStatus();

}