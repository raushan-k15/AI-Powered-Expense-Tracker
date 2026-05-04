import React from "react";

const Button = ({
  text,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  variant = "primary"
}) => {

  const buttonStyle = {

    primary:
      "bg-cyan-500 hover:bg-cyan-600",

    danger:
      "bg-red-500 hover:bg-red-600",

    dark:
      "bg-slate-800 hover:bg-slate-700"

  };

  return (

    <button

      type={type}

      onClick={onClick}

      disabled={
        disabled ||
        loading
      }

      className={`

        ${buttonStyle[variant]}

        px-6 py-3 rounded-xl
        text-white font-semibold
        transition-all duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed

      `}

    >

      {

        loading
          ? "Loading..."
          : text

      }

    </button>

  );

};

export default Button;