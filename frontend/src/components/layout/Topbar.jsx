import React from "react";
import {
  Menu
} from "lucide-react";

const Topbar = ({
  setOpen
}) => {

  return (

    <div className="bg-slate-900 p-5 flex items-center">

      <button
        onClick={() =>
          setOpen(prev => !prev)
        }>

        <Menu
          className="text-white"
        />

      </button>

    </div>

  );

};

export default Topbar;