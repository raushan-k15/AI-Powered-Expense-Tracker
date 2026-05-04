package org.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data

public class SummaryResponse {

    private Double totalAmount;

    private Long totalTransactions;

}