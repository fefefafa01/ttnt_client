import React, { useState } from "react";
import "./Homepage.css";
import { TabList, Tab, Tabs, TabPanel } from "react-tabs";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { ResultList } from "components/SearchList";
import { PartList } from "components/PartList/PartList";

function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    return (
        <>
            <AdminHeader />
            <div className="hbody">
                <SearchCriteria
                    isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                />
                <div className="wrappers">
                    <Tabs className="tabs">
                        <TabList
                            className="tab-list"
                            selectedclassname="active"
                        >
                            <Tab className="tab">Search Result</Tab>
                            <Tab className="tab">Parts List</Tab>
                        </TabList>
                        <TabPanel>
                            <ResultList />
                        </TabPanel>
                        <TabPanel>
                            <PartList />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Homepage;
