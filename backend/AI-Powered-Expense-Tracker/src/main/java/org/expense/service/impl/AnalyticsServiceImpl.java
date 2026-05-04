package org.expense.service.impl;

import java.time.LocalDate;

import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

import org.expense.dto.SummaryResponse;

import org.expense.entity.Expense;
import org.expense.entity.User;

import org.expense.repository.ExpenseRepository;
import org.expense.repository.UserRepository;

import org.expense.service.AnalyticsService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

@Service
public class AnalyticsServiceImpl
        implements AnalyticsService {

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private UserRepository userRepo;


    private User getCurrentUser() {

        String email =

                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepo.findByEmail(
                email
        ).orElseThrow(() ->

                new RuntimeException(
                        "User not found"
                )

        );

    }


    @Override
    public SummaryResponse getSummary() {

        User user =
                getCurrentUser();

        List<Expense> expenses =

                expenseRepo.findByUser(
                        user
                );

        double total =

                expenses.stream()

                        .mapToDouble(
                                Expense::getAmount
                        )

                        .sum();

        long count =
                expenses.size();

        return new SummaryResponse(
                total,
                count
        );

    }


    @Override
    public Map<String, Double>
    getCategoryBreakdown() {

        User user =
                getCurrentUser();

        List<Expense> expenses =

                expenseRepo.findByUser(
                        user
                );

        return expenses.stream()

                .collect(

                        Collectors.groupingBy(

                                Expense::getCategory,

                                Collectors.summingDouble(

                                        Expense::getAmount

                                )

                        )

                );

    }


    @Override
    public Double getLast7DaysSpending() {

        User user =
                getCurrentUser();

        LocalDate last7Days =

                LocalDate.now()
                        .minusDays(7);

        return expenseRepo

                .findByUser(user)

                .stream()

                .filter(expense ->

                        !expense.getDate()
                                .isBefore(
                                        last7Days
                                )

                )

                .mapToDouble(
                        Expense::getAmount
                )

                .sum();

    }


    @Override
    public Double getLast30DaysSpending() {

        User user =
                getCurrentUser();

        LocalDate last30Days =

                LocalDate.now()
                        .minusDays(30);

        return expenseRepo

                .findByUser(user)

                .stream()

                .filter(expense ->

                        !expense.getDate()
                                .isBefore(
                                        last30Days
                                )

                )

                .mapToDouble(
                        Expense::getAmount
                )

                .sum();

    }


    @Override
    public List<Map<String, Object>>
    getTrendData(
            String type
    ) {

        User user =
                getCurrentUser();

        List<Expense> expenses =

                expenseRepo.findByUser(
                        user
                );

        Map<String, Double> groupedData;


        // WEEK
        if (

                type.equalsIgnoreCase(
                        "week"
                )

        ) {

            LocalDate startDate =

                    LocalDate.now()
                            .minusDays(7);

            groupedData =

                    expenses.stream()

                            .filter(expense ->

                                    !expense.getDate()
                                            .isBefore(
                                                    startDate
                                            )

                            )

                            .collect(

                                    Collectors.groupingBy(

                                            expense ->

                                                    expense.getDate()

                                                            .getDayOfWeek()

                                                            .toString(),

                                            Collectors.summingDouble(

                                                    Expense::getAmount

                                            )

                                    )

                            );

        }


        // MONTH
        else if (

                type.equalsIgnoreCase(
                        "month"
                )

        ) {

            LocalDate startDate =

                    LocalDate.now()
                            .minusDays(30);

            groupedData =

                    expenses.stream()

                            .filter(expense ->

                                    !expense.getDate()
                                            .isBefore(
                                                    startDate
                                            )

                            )

                            .collect(

                                    Collectors.groupingBy(

                                            expense ->

                                                    "Week " +

                                                    (

                                                        (

                                                            expense.getDate()

                                                                    .getDayOfMonth()

                                                                    - 1

                                                        ) / 7 + 1

                                                    ),

                                            Collectors.summingDouble(

                                                    Expense::getAmount

                                            )

                                    )

                            );

        }


        // YEAR
        else if (

                type.equalsIgnoreCase(
                        "year"
                )

        ) {

            groupedData =

                    expenses.stream()

                            .collect(

                                    Collectors.groupingBy(

                                            expense ->

                                                    expense.getDate()

                                                            .getMonth()

                                                            .toString(),

                                            Collectors.summingDouble(

                                                    Expense::getAmount

                                            )

                                    )

                            );

        }


        // ALL
        else {

            groupedData =

                    expenses.stream()

                            .collect(

                                    Collectors.groupingBy(

                                            expense ->

                                                    String.valueOf(

                                                            expense.getDate()

                                                                    .getYear()

                                                    ),

                                            Collectors.summingDouble(

                                                    Expense::getAmount

                                            )

                                    )

                            );

        }


        return groupedData

                .entrySet()

                .stream()

                .map(entry ->

                        Map.<String, Object>of(

                                "label",
                                entry.getKey(),

                                "amount",
                                entry.getValue()

                        )

                )

                .collect(
                        Collectors.toList()
                );

    }

}