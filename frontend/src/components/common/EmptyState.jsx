import React from "react";

const EmptyState = ({
  title = "No Expenses Found",
  message = "Start adding your expenses to see analytics and insights."
}) => {

  return (

    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">

      {/* Icon */}
      <div className="text-5xl mb-4">

        📊

      </div>

      {/* Title */}
      <h2 className="text-white text-2xl font-bold mb-3">

        {title}

      </h2>

      {/* Message */}
      <p className="text-gray-400 text-base max-w-md mx-auto">

        {message}

      </p>

    </div>

  );

};

export default EmptyState;