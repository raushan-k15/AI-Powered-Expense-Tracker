package org.expense.util;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;

import org.expense.entity.Expense;

public class ExpenseSpecification {

	public static Specification<Expense> filterExpenses(

	        String search,

	        List<String> categories,

	        Double minAmount,

	        Double maxAmount,

	        LocalDate startDate,

	        LocalDate endDate) {

	    return (root, query, cb) -> {

	        Predicate predicate =
	                cb.conjunction();

	        if(search != null &&
	                !search.isEmpty()) {

	            Predicate categoryMatch =
	                    cb.like(
	                            cb.lower(
	                                    root.get("category")),
	                            "%" +
	                                    search.toLowerCase()
	                                    + "%"
	                    );

	            Predicate notesMatch =
	                    cb.like(
	                            cb.lower(
	                                    root.get("notes")),
	                            "%" +
	                                    search.toLowerCase()
	                                    + "%"
	                    );

	            predicate =
	                    cb.and(
	                            predicate,
	                            cb.or(
	                                    categoryMatch,
	                                    notesMatch
	                            )
	                    );
	        }

	        if(categories != null &&
	                !categories.isEmpty()) {

	            predicate =
	                    cb.and(
	                            predicate,
	                            root.get("category")
	                                    .in(categories)
	                    );
	        }

	        if(minAmount != null) {

	            predicate =
	                    cb.and(
	                            predicate,
	                            cb.greaterThanOrEqualTo(
	                                    root.get("amount"),
	                                    minAmount
	                            )
	                    );
	        }

	        if(maxAmount != null) {

	            predicate =
	                    cb.and(
	                            predicate,
	                            cb.lessThanOrEqualTo(
	                                    root.get("amount"),
	                                    maxAmount
	                            )
	                    );
	        }

	        if(startDate != null) {

	            predicate =
	                    cb.and(
	                            predicate,
	                            cb.greaterThanOrEqualTo(
	                                    root.get("date"),
	                                    startDate
	                            )
	                    );
	        }

	        if(endDate != null) {

	            predicate =
	                    cb.and(
	                            predicate,
	                            cb.lessThanOrEqualTo(
	                                    root.get("date"),
	                                    endDate
	                            )
	                    );
	        }

	        return predicate;
	    };
	}

	public static Specification<Expense> filterExpenses(String search, Double minAmount, Double maxAmount,
			LocalDate startDate, LocalDate endDate) {
		// TODO Auto-generated method stub
		return null;
	}
}