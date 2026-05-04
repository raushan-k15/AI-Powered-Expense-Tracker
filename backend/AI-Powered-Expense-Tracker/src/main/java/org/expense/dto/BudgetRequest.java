package org.expense.dto;

import lombok.Data;

@Data
public class BudgetRequest {

    private Double monthlyLimit;

	public Double getMonthlyLimit() {
		return monthlyLimit;
	}

	public void setMonthlyLimit(Double monthlyLimit) {
		this.monthlyLimit = monthlyLimit;
	}

	
    

}