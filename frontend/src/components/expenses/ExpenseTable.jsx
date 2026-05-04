import React from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  deleteExpense
} from "../../services/expenseService";

const ExpenseTable = ({
  expenses,
  refreshExpenses
}) => {

  const navigate =
    useNavigate();

  const handleDelete =
    async (id) => {

      await deleteExpense(id);

      refreshExpenses();

    };

  return (

    <div className="bg-slate-900 rounded-3xl p-6 text-white">

      <h2 className="text-2xl font-bold mb-6">

        Expense History

      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700 text-gray-400">

            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            expenses.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-800"
              >

                <td>{item.category}</td>

                <td className="text-cyan-400">

                  ₹{item.amount}

                </td>

                <td>{item.date}</td>

                <td>

                  {item.notes || "No notes"}

                </td>

                <td>

                  <div className="flex gap-2">

                    <button

                      onClick={() =>
                        navigate(
                          `/edit-expense/${item.id}`
                        )
                      }

                      className="bg-cyan-500 px-3 py-1 rounded-lg"

                    >

                      Edit

                    </button>

                    <button

                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }

                      className="bg-red-500 px-3 py-1 rounded-lg"

                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

};

export default ExpenseTable;