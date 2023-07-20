import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { Tabs, Button } from "antd";
import { PartList } from "components/PartList/PartList";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { SearchResult } from "components/SearchList";
import { ResultList } from "components/ResultList/ResultList";
import { PartSubgroup } from "components/PartGroup";
const { TabPane } = Tabs;

function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [activeKey, setActiveKey] = useState("1");
    const [panes, setPanes] = useState([
        {
            title: "Search Result",
            key: "1",
            closable: false,
        },
        {
            title: "KUN25, Engine/Fuel group-Parts subgroup list",
            key: "2",
        },
    ]);

    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    };

    const onEdit = (targetKey, action) => {
        action === "remove" ? remove(targetKey) : add();
    };

    const add = (buttonName) => {
        const newTabIndex = panes.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <PartList carid={29} SubGroupName={buttonName} />,
            key: activeKey,
        };
        setPanes([...panes, newPane]);
        setActiveKey(activeKey);
    };

    const addGroup = (formValues, count) => {
        const newTabIndex = panes.length;
        const activeKey = `newTab${newTabIndex}`;
        console.log(formValues);
        let text = "Result List";
        if (count === 0) {
            text = "Vehicel Model List";
        }
        const newPane = {
            title: text,
            content: <ResultList formValues={formValues} count={count} />,
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
            <div className="hbody">
                <SearchCriteria
                    onAdd={addGroup}
                    isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                />
                <div className="wrappers">
                    <Tabs
                        hideAdd
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
                                {pane.key === "1" ? (
                                    <SearchResult />
                                ) : pane.key === "2" ? (
                                    <PartSubgroup carid={29} onAdd={add} />
                                ) : (
                                    pane.content
                                )}
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Homepage;
