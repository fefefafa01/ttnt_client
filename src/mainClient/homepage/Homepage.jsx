import React, { useState, useRef } from "react";
import "./Homepage.scss";
import { Tabs } from "antd";
import { PartList } from "components/PartList/PartList";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { SearchResult } from "components/SearchList"
import { ResultList } from "components/ResultList/ResultList";
import { PartSubgroup, PartGroup } from "components/PartGroup";
import { ResultPartList } from "components/ResultList/ResultPartList";
import {PartListGroup} from "components/ResultList/PartListGroup"

const { TabPane } = Tabs;

function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const [partSubName, setPartSubName] = useState("");

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [activeKey, setActiveKey] = useState("1");
    const panes= useRef([
        {
            title: "Search Result",
            key: "1",
            closable: false,
        },
        {
            title: "KUN25, Parts group list",
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
        const newTabIndex = panes.current.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <PartList carid={102} SubGroupName={buttonName} />,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
    };

    const addSub = (buttonSubName) => {
        console.log(buttonSubName);
        const newTabIndex = panes.current.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: `KUN25, ${buttonSubName} group-Parts subgroup list`,
            content: (
                <PartSubgroup
                    carid={102}
                    partGroupName={buttonSubName}
                    onAdd={add}
                />
            ),
            key: activeKey,
        };
        setPartSubName(buttonSubName);
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
    };

    
    const addGroup = (formValues, count) => { 
        console.log(formValues);
        let text = "Result List";
        if (count === 0) {
            text = "Vehicel Model List";
        }
            const newTabIndex = panes.current.length;
            const activeKey = `newTab${newTabIndex}`;
            const newPane = {
                title: text,
                content: <ResultList formValues={formValues} count={count} Add={addList} onAdd = {addSGroup}/>,
                key: activeKey,
            };
            panes.current = [...panes.current, newPane];
            setActiveKey(activeKey);
            console.log(panes)

    };

    const addList = (id, formValues) => {
        const newTabIndex = panes.current.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <ResultPartList formValues = {formValues} id = {id}/>,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
    };

    const addSGroup = (id, buttonName) => {
        const newTabIndex = panes.current.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: buttonName + " - " + "Parts Group List",
            content: <PartListGroup carid = {id} onAdd = {add}/>,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
    };

      const remove = (targetKey) => {
        panes.current = panes.current.filter((pane) => pane.key !== targetKey);
        const newActiveKey = activeKey === targetKey ? panes.current[panes.current.length - 1]?.key : activeKey;
        setActiveKey(newActiveKey);
      };

    return (
        <div>
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
                        {panes.current.map((pane) => (
                            <TabPane
                                tab={pane.title}
                                key={pane.key}
                                closable={pane.closable}
                            >
                                {pane.title === "Search Result" ? (
                                    <SearchResult />
                                ) : pane.title.includes("Parts group list") ? (
                                    <PartGroup carid={102} onAdd={addSub} />
                                ) : pane.title.includes(
                                      "Parts subgroup list"
                                  ) ? (
                                    <PartSubgroup
                                        carid={102}
                                        partGroupName={partSubName}
                                        onAdd={add}
                                    />
                                ) : (
                                    pane.content
                                )}
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
