import React, { useState } from "react";
import "./Homepage.css";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { ResultList } from "components/SearchList";

function Homepage() {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  return (
    <>
      <AdminHeader />
      <SearchCriteria isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
      <ResultList />
    </>
  );
}

export default Homepage;
