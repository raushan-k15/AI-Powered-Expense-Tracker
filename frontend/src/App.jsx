import React from "react";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import AIInsights from "./pages/AIInsights";
import EditExpense from "./pages/EditExpense";

const router =
  createBrowserRouter([

    {
      path: "/",

      element: <Layout />,

      children: [

        {
          index: true,

          element: <Dashboard />
        },

        {
          path: "dashboard",

          element: <Dashboard />
        },

        {
          path: "expenses",

          element: <Expenses />
        },

        {
          path: "add-expense",

          element: <AddExpense />
        },

        {
          path: "ai-insights",

          element: <AIInsights />
        },

        {
          path: "edit-expense/:id",

          element: <EditExpense />
        },

        {
          path: "login",

          element: <Login />
        },

        {
          path: "register",

          element: <Register />
        }

      ]

    }

  ]);

const App = () => {

  return (

    <>

      <RouterProvider
        router={router}
      />

      <ToastContainer

        position="top-right"

        autoClose={2000}

      />

    </>

  );

};

export default App;