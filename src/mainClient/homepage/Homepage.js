import React, { useState } from "react";
import "./Homepage.css";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { SearchResult } from "components/SearchList";
import { Tabs } from "antd";
import { PartList } from "components/PartList/PartList";
import { ResultList } from "components/ResultList/ResultList";

const { TabPane } = Tabs;

function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [activeKey, setActiveKey] = useState("1");
    const [panes, setPanes] = useState([
        { title: "Search Result", content: <SearchResult />, key: "1" },
        { title: "Parts List", content: <PartList />, key: "2" },
        { title: "Result List", content: <ResultList />, key: "3" },
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
        </>
    );
}

export default Homepage;
