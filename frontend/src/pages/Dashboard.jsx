import React, {
  useEffect,
  useState
} from "react";

import {
  getSummary,
  getBudget
} from "../services/analyticsService";

import {
  getExpenses
} from "../services/expenseService";

import StatsCards from "../components/dashboard/StatsCards";
import BudgetCard from "../components/dashboard/BudgetCard";
import SetBudget from "../components/dashboard/SetBudget";
import AIInsightCard from "../components/dashboard/AIInsightCard";
import CategoryChart from "../components/dashboard/CategoryChart";
import TrendChart from "../components/dashboard/TrendChart";
import RecentExpenses from "../components/dashboard/RecentExpenses";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseForm from "../components/expenses/ExpenseForm";

const Dashboard = () => {

  const [summary, setSummary] =
    useState({});

  const [budget, setBudget] =
    useState({});

  const [expenses, setExpenses] =
    useState([]);

  const token =
    localStorage.getItem(
      "token"
    );


  useEffect(() => {

    loadDashboard();

  }, []);


  const loadDashboard =
    async () => {

      try {

        const summaryData =
          await getSummary();

        const budgetData =
          await getBudget();


        if (token) {

          const expenseData =
            await getExpenses();

          setExpenses(
            expenseData
          );


          const today =
            new Date();

          const sevenDaysAgo =
            new Date();

          sevenDaysAgo.setDate(
            today.getDate() - 6
          );


          const thirtyDaysAgo =
            new Date();

          thirtyDaysAgo.setDate(
            today.getDate() - 29
          );


          let totalExpense = 0;

          let last7Days = 0;

          let last30Days = 0;


          expenseData.forEach(

            (item) => {

              const amount =
                Number(
                  item.amount || 0
                );

              const expenseDate =
                new Date(
                  item.date +
                  "T00:00:00"
                );

              totalExpense += amount;


              if (
                expenseDate >=
                sevenDaysAgo
              ) {

                last7Days += amount;

              }


              if (
                expenseDate >=
                thirtyDaysAgo
              ) {

                last30Days += amount;

              }

            }

          );


          setSummary({

            ...summaryData,

            totalExpense,

            last7Days,

            last30Days,

            transactions:
              expenseData.length

          });

        }


        setBudget(
          budgetData
        );

      }

      catch (error) {

        console.log(
          error
        );

      }

    };


  return (

    <div className="
      min-h-screen
      ml-[280px]
      px-6
      md:px-10
      xl:px-16
      py-8
    ">

      <div className="
        max-w-[1600px]
        mx-auto
        space-y-16
      ">


        {/* Header */}
        <section className="
          text-center
        ">

          <h1 className="
            text-white
            text-4xl
            md:text-5xl
            font-bold
            mb-2
          ">

            Financial Dashboard

          </h1>

          <p className="
            text-gray-400
          ">

            Manage expenses with analytics + AI

          </p>

        </section>

        <br></br>
        {/* Stats */}
        <section>

          <StatsCards
            summary={summary}
          />

        </section>

        <br></br>
        {/* Budget */}
        {

          token && (

            <section>

              <SetBudget
                refreshBudget={
                  loadDashboard
                }
              />

            </section>

          )

        }

        <br></br>
        {/* Budget + AI */}
        <section className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        ">

          <BudgetCard
            budget={budget}
          />

          <AIInsightCard />

        </section>

        <br></br>
        {/* Charts */}
        <section className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
        ">

          <CategoryChart />

          <TrendChart />

        </section>

        <br></br>
        {/* Recent Expenses */}
        <section>

          <RecentExpenses />

        </section>

         <br></br>
        {/* Expense Table + Form */}
        {

          token && (

            <>

              <section>

                <ExpenseTable

                  expenses={
                    expenses
                  }

                  refreshExpenses={
                    loadDashboard
                  }

                />

              </section>

              <br></br>
              <section className="
                flex
                justify-center
                pb-10
              ">

                <div className="
                  w-full
                  max-w-4xl
                ">

                  <ExpenseForm />

                </div>

              </section>

            </>

          )

        }

      </div>

    </div>

  );

};

export default Dashboard;