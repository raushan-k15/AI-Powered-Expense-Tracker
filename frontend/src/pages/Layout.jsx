import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";
const Layout = () => {

  const [open, setOpen] =
    useState(true);

  return (
    <div>
       <div className="flex bg-slate-950 min-h-screen">

      <Sidebar
        open={open}
      />

      <div className="flex-1">

        <Topbar
          setOpen={setOpen}
        />

        <main className="p-8">

          <Outlet />

        </main>

      </div>
    </div>
    <Footer/>
    </div>
   

  );

};

export default Layout;