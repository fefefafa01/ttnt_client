import { SearchList } from "./SearchList";
import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchCriteria = (props) => {
  const sidebarClass = props.isOpen ? "sidebar open" : "sidebar";
  return (
    <div className={sidebarClass}>
      <div> Hello </div>
      <button onClick={props.toggleSidebar} className="sidebar-toggle">
        Hiii
      </button>
    </div>
  );
};

export { SearchCriteria };
