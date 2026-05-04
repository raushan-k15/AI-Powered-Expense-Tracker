//package org.expense.service.impl;
//
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import org.expense.dto.AIResponse;
//import org.expense.entity.Expense;
//import org.expense.repository.ExpenseRepository;
//import org.expense.service.AIInsightService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AIInsightServiceImpl
//        implements AIInsightService {
//
//    @Autowired
//    private ExpenseRepository expenseRepo;
//
//    @Override
//    public AIResponse generateInsights() {
//
//        List<Expense> expenses =
//                expenseRepo.findAll();
//
//        double total =
//                expenses.stream()
//                        .mapToDouble(
//                                Expense::getAmount
//                        )
//                        .sum();
//
//        Map<String, Double> categories =
//                expenses.stream()
//
//                        .collect(
//                                Collectors.groupingBy(
//
//                                        Expense::getCategory,
//
//                                        Collectors.summingDouble(
//                                                Expense::getAmount
//                                        )
//                                )
//                        );
//
//        String topCategory =
//                categories.entrySet()
//
//                        .stream()
//
//                        .max(
//                                Map.Entry.comparingByValue()
//                        )
//
//                        .map(
//                                Map.Entry::getKey
//                        )
//
//                        .orElse("Unknown");
//
//        String insight =
//                "Top spending category: "
//                        + topCategory
//                        + ". Total spent ₹"
//                        + total
//                        + ". Tip: Reduce unnecessary spending.";
//
//        return new AIResponse(
//                insight
//        );
//    }
//}