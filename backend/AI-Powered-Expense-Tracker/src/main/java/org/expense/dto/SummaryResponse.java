package org.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SummaryResponse {

    private Double totalAmount;

    private Long totalTransactions;

	
	public SummaryResponse(Double totalAmount, Long totalTransactions) {
		super();
		this.totalAmount = totalAmount;
		this.totalTransactions = totalTransactions;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Long getTotalTransactions() {
		return totalTransactions;
	}

	public void setTotalTransactions(Long totalTransactions) {
		this.totalTransactions = totalTransactions;
	}
    
    

}