import React, {
  useState
} from "react";

import {
  setBudget
} from "../../services/budgetService";

const SetBudget = ({
  refreshBudget
}) => {

  const [amount, setAmount] =

    useState("");

  const [loading, setLoading] =

    useState(false);

  const [message, setMessage] =

    useState("");


  const handleBudget =
    async () => {

      if (

        !amount ||

        Number(amount) <= 0

      ) {

        setMessage(
          "Enter valid budget"
        );

        return;

      }

      try {

        setLoading(
          true
        );

        await setBudget({

          monthlyLimit:
            Number(amount)

        });

        setMessage(
          `Budget set: ₹${amount}`
        );

        setAmount("");

        refreshBudget();

      }

      catch (error) {

        console.log(
          error
        );

        setMessage(
          "Failed to set budget"
        );

      }

      finally {

        setLoading(
          false
        );

      }

    };


  return (

    <div className="bg-slate-900 rounded-3xl p-6">

      <h2 className="text-white text-2xl mb-4">

        Set Budget

      </h2>


      <div className="flex gap-4">

        <input

          type="number"

          value={amount}

          onChange={(e)=>

            setAmount(
              e.target.value
            )

          }

          placeholder="Enter monthly budget"

          className="flex-1 bg-slate-800 text-white p-4 rounded-xl"

        />


        <button

          onClick={handleBudget}

          disabled={loading}

          className="bg-cyan-500 text-white px-6 rounded-xl"

        >

          {

            loading

              ? "Saving..."

              : "Save"

          }

        </button>

      </div>


      {

        message && (

          <p className="text-cyan-400 mt-4">

            {message}

          </p>

        )

      }

    </div>

  );

};

export default SetBudget;