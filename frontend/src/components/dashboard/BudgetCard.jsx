import React from "react";

const BudgetCard = ({
  budget
}) => {

  const used =

    budget.monthlyLimit > 0

      ? Math.round(

          (
            budget.spent /

            budget.monthlyLimit

          ) * 100

        )

      : 0;


  const progress =

    Math.min(
      used,
      100
    );


  return (

    <div className="bg-slate-900 rounded-3xl p-6 text-white">

      <h2 className="text-2xl font-bold mb-5">

        Monthly Budget

      </h2>


      <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden">

        <div

          className={`h-full transition-all duration-700 ${
            used >= 80

              ? "bg-red-500"

              : "bg-cyan-500"
          }`}

          style={{

            width:
              `${progress}%`

          }}

        />

      </div>


      <div className="mt-5 space-y-2">

        <p>

          Monthly Limit:

          {" "}

          ₹{budget.monthlyLimit || 0}

        </p>


        <p>

          Total Spent:

          {" "}

          ₹{budget.spent || 0}

        </p>


        <p>

          Usage:

          {" "}

          {used}%

        </p>

      </div>


      {

        used >= 80 && (

          <p className="text-red-400 mt-4">

            Warning: Budget usage crossed 80%

          </p>

        )

      }

    </div>

  );

};

export default BudgetCard;