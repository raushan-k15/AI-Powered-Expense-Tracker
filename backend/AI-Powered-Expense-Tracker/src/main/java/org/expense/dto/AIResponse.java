package org.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AIResponse {

    

	public AIResponse(String insight) {
		super();
		this.insight = insight;
	}

	private String insight;
    
    
    

}