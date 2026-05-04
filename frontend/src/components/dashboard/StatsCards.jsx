import React from "react";

const StatsCards = ({ summary }) => {

  const cards = [

    {
      title: "Total Expenses",
      value: `₹${summary.totalExpense || 0}`,
      color: "from-purple-500 to-purple-700"
    },

    {
      title: "Transactions",
      value: summary.transactions || 0,
      color: "from-cyan-500 to-cyan-700"
    },

    {
      title: "Last 7 Days",
      value: `₹${summary.last7Days || 0}`,
      color: "from-pink-500 to-pink-700"
    },

    {
      title: "Last 30 Days",
      value: `₹${summary.last30Days || 0}`,
      color: "from-orange-500 to-orange-700"
    }

  ];

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div

          key={index}

          className={`
            bg-gradient-to-r
            ${card.color}
            p-6
            rounded-3xl
            text-white
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
          `}

        >

          <p className="text-sm opacity-80 mb-2">
            {card.title}
          </p>

          <h2 className="text-3xl font-bold">
            {card.value}
          </h2>

        </div>

      ))}

    </div>

  );

};

export default StatsCards;