package org.expense.service;

import java.util.List;
import java.util.Map;

import org.expense.dto.SummaryResponse;

public interface AnalyticsService {

    SummaryResponse getSummary();

    Map<String, Double> getCategoryBreakdown();

    Double getLast7DaysSpending();

    Double getLast30DaysSpending();

    List<Map<String, Object>> getTrendData(
            String type
    );

}