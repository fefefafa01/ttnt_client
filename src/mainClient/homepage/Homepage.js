import React, { useState } from "react";
import "./Homepage.css";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { ResultList } from "components/SearchList";

function Homepage() {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  return (
    <div className="body">
      {/* <AdminHeader /> */}
      <SearchCriteria isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <ResultList />
    </div>
  );
}

export default Homepage;
