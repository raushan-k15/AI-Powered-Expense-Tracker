import React from "react";

// import {
//   GitHub,
//   Linkedin,
//   Mail
// } from "lucide-react";

const Footer = () => {

  return (

    <footer className="w-full bg-slate-900 border-t border-slate-800 px-10 py-6 mt-20">

      <div className="flex flex-col md:flex-row justify-between items-center gap-5">

        {/* Brand */}
        <div>

          <h2 className="text-white text-2xl font-bold">

            ExpenseAI

          </h2>

          <p className="text-gray-400 text-sm mt-1">

            AI-Powered Smart Expense Tracker

          </p>

        </div>

        {/* Social
        <div className="flex gap-5 text-gray-400">

          <Github className="cursor-pointer hover:text-white" />

          <Linkedin className="cursor-pointer hover:text-white" />

          <Mail className="cursor-pointer hover:text-white" />

        </div> */}

        {/* Copyright */}
        <div className="text-gray-500 text-sm">

          © 2026 Raushan Kumar

        </div>

      </div>

    </footer>

  );

};

export default Footer;