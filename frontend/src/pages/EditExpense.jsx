import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import {
  getExpenses,
  updateExpense
} from "../services/expenseService";

const EditExpense = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      amount: "",
      category: "",
      date: "",
      notes: ""

    });

  useEffect(() => {

    loadExpense();

  }, []);

  const loadExpense =
    async () => {

      try {

        const data =
          await getExpenses();

        const selected =
          data.find(

            item =>
              item.id ===
              Number(id)

          );

        if(selected){

          setFormData(
            selected
          );

        }

      } catch(error){

        console.log(error);

      }

  };

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

  };

  const handleUpdate =
    async () => {

      try {

        await updateExpense(

          id,

          formData

        );

        alert(
          "Expense Updated Successfully"
        );

        navigate(
          "/dashboard"
        );

      } catch(error){

        console.log(error);

        alert(
          "Update Failed"
        );

      }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">

      <div className="w-full max-w-xl bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800">

        <h1 className="text-white text-3xl font-bold mb-2">

          Edit Expense

        </h1>

        <p className="text-gray-400 mb-8">

          Update your expense details

        </p>

        <div className="space-y-5">

          {/* Amount */}
          <div>

            <label className="text-gray-300 block mb-2">

              Amount

            </label>

            <input

              name="amount"

              value={formData.amount}

              onChange={handleChange}

              className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none"

            />

          </div>

          {/* Category */}
          <div>

            <label className="text-gray-300 block mb-2">

              Category

            </label>

            <input

              name="category"

              value={formData.category}

              onChange={handleChange}

              className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none"

            />

          </div>

          {/* Date */}
          <div>

            <label className="text-gray-300 block mb-2">

              Date

            </label>

            <input

              type="date"

              name="date"

              value={formData.date}

              onChange={handleChange}

              className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none"

            />

          </div>

          {/* Notes */}
          <div>

            <label className="text-gray-300 block mb-2">

              Notes

            </label>

            <textarea

              name="notes"

              value={formData.notes}

              onChange={handleChange}

              rows="4"

              placeholder="Enter notes..."

              className="w-full p-4 bg-slate-800 text-white rounded-xl outline-none resize-none"

            />

          </div>

          {/* Update Button */}
          <button

            onClick={handleUpdate}

            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all p-4 rounded-xl text-white font-semibold">

            Update Expense

          </button>

        </div>

      </div>

    </div>

  );

};

export default EditExpense;