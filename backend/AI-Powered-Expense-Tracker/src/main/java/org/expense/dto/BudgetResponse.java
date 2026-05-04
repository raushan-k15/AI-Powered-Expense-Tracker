package org.expense.dto;

public class BudgetResponse {

    private Double monthlyLimit;

    private Double spent;

    private Double percentage;

    private String alertMessage;


    public BudgetResponse(
            Double monthlyLimit,
            Double spent,
            Double percentage,
            String alertMessage
    ) {

        this.monthlyLimit =
                monthlyLimit;

        this.spent =
                spent;

        this.percentage =
                percentage;

        this.alertMessage =
                alertMessage;

    }


    public Double getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(
            Double monthlyLimit
    ) {
        this.monthlyLimit =
                monthlyLimit;
    }


    public Double getSpent() {
        return spent;
    }

    public void setSpent(
            Double spent
    ) {
        this.spent =
                spent;
    }


    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(
            Double percentage
    ) {
        this.percentage =
                percentage;
    }


    public String getAlertMessage() {
        return alertMessage;
    }

    public void setAlertMessage(
            String alertMessage
    ) {
        this.alertMessage =
                alertMessage;
    }

}