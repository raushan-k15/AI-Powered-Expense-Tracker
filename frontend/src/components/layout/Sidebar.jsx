import React from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  LayoutDashboard,
  Wallet,
  PlusCircle,
  Sparkles,
  LogOut
} from "lucide-react";

const Sidebar = ({
  open
}) => {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "token"
    );

  if(!open)
    return null;

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate(
      "/login"
    );

  };

  const menu = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />
    },

    {
      name: "Expenses",
      path: "/expenses",
      icon: <Wallet size={20} />
    },

    {
      name: "Add Expense",
      path: "/add-expense",
      icon: <PlusCircle size={20} />
    },

    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: <Sparkles size={20} />
    }

  ];

  return (

    <div className="w-[270px] min-h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-white text-3xl font-bold mb-10">

          ExpenseAI

        </h1>

        <div className="space-y-4">

          {
            menu.map((item) => (

              <Link

                key={item.path}

                to={item.path}

                className={`flex items-center gap-4 px-5 py-4 rounded-2xl ${
                  location.pathname === item.path
                    ? "bg-cyan-500 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}

              >

                {item.icon}

                {item.name}

              </Link>

            ))
          }

          {

            !token ? (

              <>

                <Link
                  to="/login"
                  className="block text-white px-5 py-2">

                  Login

                </Link>

                <Link
                  to="/register"
                  className="block text-white px-5 py-2">

                  Register

                </Link>

              </>

            ) : (

              <button

                onClick={logout}

                className="flex items-center gap-4 px-5 py-2 text-red-400">

                <LogOut size={20} />

                Logout

              </button>

            )

          }

        </div>

      </div>

    </div>

  );

};

export default Sidebar;