import React, {
  useEffect,
  useState
} from "react";

import {
  getExpenses
} from "../../services/expenseService";

const RecentExpenses = () => {

  const [expenses, setExpenses] =

    useState([]);

  const [loading, setLoading] =

    useState(true);

  useEffect(() => {

    loadRecentExpenses();

  }, []);

  const loadRecentExpenses =
    async () => {

      try {

        const data =

          await getExpenses(
            "",
            0
          );

        // latest 5 expenses
        setExpenses(

          data.slice(0, 5)

        );

      }

      catch (error) {

        console.log(
          error
        );

      }

      finally {

        setLoading(
          false
        );

      }

    };

  return (

    <div className="bg-slate-900 rounded-3xl p-6 text-white">

      <h2 className="text-2xl font-bold mb-5">

        Recent Expenses

      </h2>

      {

        loading && (

          <p className="text-gray-400">

            Loading...

          </p>

        )

      }

      {

        !loading &&

        expenses.length === 0 && (

          <p className="text-gray-400">

            No recent expenses

          </p>

        )

      }

      <div className="space-y-4">

        {

          expenses.map(

            (item) => (

              <div

                key={item.id}

                className="flex justify-between border-b border-slate-800 pb-3"

              >

                <div>

                  <p className="font-medium">

                    {item.category}

                  </p>

                  <p className="text-sm text-gray-400">

                    {item.notes || "No notes"}

                  </p>

                </div>

                <p className="text-cyan-400 font-semibold">

                  ₹{item.amount}

                </p>

              </div>

            )

          )

        }

      </div>

    </div>

  );

};

export default RecentExpenses;