import React, { useState } from "react";
import "./Homepage.css";
import { Tabs } from "antd";
// import { AdminHeader } from "components/Header";
// import { SearchCriteria } from "components/SearchCriteria";
// import { ResultList } from "components/SearchList";
import { PartList } from "components/PartList/PartList";

// const { TabPane } = Tabs;

// function Homepage() {
//     const [sidebarOpen, setSideBarOpen] = useState(false);
//     const handleViewSidebar = () => {
//         setSideBarOpen(!sidebarOpen);
//     };

//     const [activeKey, setActiveKey] = useState("1");
//     const [panes, setPanes] = useState([
//         { title: "Search Result", content: <ResultList />, key: "1" },
//         { title: "Parts List", content: <PartList />, key: "2" },
//     ]);

//     const onChange = (activeKey) => {
//         setActiveKey(activeKey);
//     };

//     const onEdit = (targetKey, action) => {
//         action === "remove" ? remove(targetKey) : add();
//     };

//     const add = () => {
//         const newTabIndex = panes.length;
//         const activeKey = `newTab${newTabIndex}`;
//         const newPane = {
//             title: "New Tab",
//             content: "Content of new Tab",
//             key: activeKey,
//         };
//         setPanes([...panes, newPane]);
//         setActiveKey(activeKey);
//     };

//     const remove = (targetKey) => {
//         let newActiveKey = activeKey;
//         let lastIndex;
//         const newPanes = panes.filter((pane, i) => {
//             if (pane.key === targetKey) {
//                 lastIndex = i - 1;
//             }
//             return pane.key !== targetKey;
//         });

//         if (newPanes.length && newActiveKey === targetKey) {
//             if (lastIndex >= 0) {
//                 newActiveKey = newPanes[lastIndex].key;
//             } else {
//                 newActiveKey = newPanes[0].key;
//             }
//         }
//         setPanes(newPanes);
//         setActiveKey(newActiveKey);
//     };

//     return (
//         <>
//             <AdminHeader />
//             <div className="hbody">
//                 <SearchCriteria
//                     isOpen={sidebarOpen}
//                     toggleSidebar={handleViewSidebar}
//                 />
//                 <div className="wrappers">
//                     <Tabs
//                         className="tabs"
//                         onChange={onChange}
//                         activeKey={activeKey}
//                         type="editable-card"
//                         onEdit={onEdit}
//                     >
//                         {panes.map((pane) => (
//                             <TabPane
//                                 tab={pane.title}
//                                 key={pane.key}
//                                 closable={pane.closable}
//                             >
//                                 {pane.content}
//                             </TabPane>
//                         ))}
//                         {/* <TabList
//                             className="tab-list"
//                             selectedclassname="active"
//                         >
//                             <Tab className="tab">Search Result</Tab>
//                             <Tab className="tab">Parts List</Tab>
//                         </TabList>
//                         <TabPanel>
//                             <ResultList />
//                         </TabPanel>
//                         <TabPanel>
//                             <PartList />
//                         </TabPanel> */}
//                     </Tabs>
//                 </div>
//             </div>
//         </>
//     );

import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { ResultList } from "components/SearchList";
const { TabPane } = Tabs;
function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [activeKey, setActiveKey] = useState("1");
    const [panes, setPanes] = useState([
        { title: "Search Result", content: <ResultList />, key: "1" },
        { title: "Parts List", content: <PartList />, key: "2" },
    ]);

    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    };

    const onEdit = (targetKey, action) => {
        action === "remove" ? remove(targetKey) : add();
    };

    const add = () => {
        const newTabIndex = panes.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: "New Tab",
            content: "Content of new Tab",
            key: activeKey,
        };
        setPanes([...panes, newPane]);
        setActiveKey(activeKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        const newPanes = panes.filter((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
            return pane.key !== targetKey;
        });

        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setPanes(newPanes);
        setActiveKey(newActiveKey);
    };
    return (
        <>
            <AdminHeader />
            <div className="body">
                <SearchCriteria
                    isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                />
                <div className="wrappers">
                    <Tabs
                        className="tabs"
                        onChange={onChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={onEdit}
                    >
                        {panes.map((pane) => (
                            <TabPane
                                tab={pane.title}
                                key={pane.key}
                                closable={pane.closable}
                            >
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Homepage;
