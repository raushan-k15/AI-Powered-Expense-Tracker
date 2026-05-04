import React, {
  useState
} from "react";

import {
  addExpense
} from "../../services/expenseService";

import {
  useNavigate
} from "react-router-dom";

const ExpenseForm = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      amount: "",
      category: "",
      date: "",
      notes: ""

    });

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

  };

  const handleSubmit =
    async () => {

      try {

        console.log(
          "Sending:",
          formData
        );

        const response =
          await addExpense(
            formData
          );

        console.log(
          "Success:",
          response
        );

        alert(
          "Expense Added Successfully"
        );

        setFormData({

          amount: "",
          category: "",
          date: "",
          notes: ""

        });

        navigate(
          "/expenses"
        );

      } catch(error){

        console.log(
          "Error:",
          error.response?.data || error.message
        );

        alert(
          "Failed to Add Expense"
        );

      }

  };

  return (

    <div className="w-full max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl">

      <div className="mb-8">

        <h2 className="text-white text-3xl font-bold">

          Add New Expense

        </h2>

        <p className="text-gray-400 mt-2">

          Track your spending smartly

        </p>

      </div>

      <div className="space-y-6">

        <div>

          <label className="text-gray-300 block mb-2">

            Amount

          </label>

          <input

            name="amount"

            value={formData.amount}

            onChange={handleChange}

            placeholder="Enter amount"

            className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none"

          />

        </div>

        <div>

          <label className="text-gray-300 block mb-2">

            Category

          </label>

          <input

            name="category"

            value={formData.category}

            onChange={handleChange}

            placeholder="Food / Travel / Shopping"

            className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none"

          />

        </div>

        <div>

          <label className="text-gray-300 block mb-2">

            Date

          </label>

          <input

            type="date"

            name="date"

            value={formData.date}

            onChange={handleChange}

            className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none"

          />

        </div>

        <div>

          <label className="text-gray-300 block mb-2">

            Notes

          </label>

          <textarea

            name="notes"

            value={formData.notes}

            onChange={handleChange}

            placeholder="Optional notes"

            className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-2xl outline-none"

          />

        </div>

        <button

          onClick={handleSubmit}

          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl text-white text-lg font-semibold">

          Save Expense

        </button>

      </div>

    </div>

  );

};

export default ExpenseForm;