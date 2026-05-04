package org.expense.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import org.expense.dto.SummaryResponse;
import org.expense.service.AnalyticsService;

@RestController
@RequestMapping("/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;


    @GetMapping("/summary")
    public SummaryResponse getSummary() {

        return analyticsService.getSummary();

    }


    @GetMapping("/category")
    public Map<String, Double>
    getCategoryBreakdown() {

        return analyticsService
                .getCategoryBreakdown();

    }


    @GetMapping("/trends")
    public List<Map<String, Object>>
    getTrend(

            @RequestParam(
                    defaultValue = "week"
            )

            String type

    ) {

        return analyticsService
                .getTrendData(
                        type
                );

    }

}