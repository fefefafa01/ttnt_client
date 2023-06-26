import { SearchList } from "./SearchList";
import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchCriteria = (props) => {
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
  return (
    <div className={sidebarClass}>
      <div> I slide into view </div>
      <div> Me Too! </div>
      <div> Me Three! </div>
      <button onClick={props.toggleSidebar} className="sidebar-toggle">
        Hiii
      </button>
    </div>
  );
};

export { SearchCriteria };
