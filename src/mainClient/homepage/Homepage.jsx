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
import { useForceUpdate } from "framer-motion";
import { useTranslation } from "react-i18next";



const initialItems = [
    {
        title: "Search Result",
        key: `0`,
        closable: false,
    },
];

const { TabPane } = Tabs;
let c = 1;

function Homepage() {
    const {t} = useTranslation();
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const [partSubName, setPartSubName] = useState("");

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const panes = useRef(initialItems);


    const onChange = (activeKey) => {
        setActiveKey(activeKey);
        console.log(activeKey)
    };

    const onEdit = (targetKey, action) => {
        action === "remove" ? remove(targetKey) : add();
    };

    const add = (buttonName, carid) => {
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <PartList carid={carid} SubGroupName={buttonName} />,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane]
        setActiveKey(activeKey);
        c++;
        console.log(panes.current)
    };

    const addSub = (carid, buttonSubName) => {
        console.log(buttonSubName);
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: buttonSubName + ` - Parts subgroup list`,
            content: (
                <PartSubgroup
                    carid={carid}
                    partGroupName={buttonSubName}
                    onAdd={add}
                />
            ),
            key: activeKey,
        };
        setPartSubName(buttonSubName);
        panes.current = [...panes.current, newPane]
        setActiveKey(activeKey);
        c++;
        console.log(panes.current)
    };

    
    const addGroup = (formValues, count) => { 
        let text = "Result List";
        if (count === 0) {
            text = "Vehicle Model List";
        }
            const newTabIndex = c;
            const activeKey = `${newTabIndex}`;
            const newPane = {
                title: text,
                content: <ResultList formValues={formValues} count={count} Add={addList} onAdd = {addSGroup}/>,
                key: activeKey,
            };
            panes.current = [...panes.current, newPane]
            setActiveKey(activeKey);
            console.log(panes.current);
            c++;

    };

    const addList = (id, formValues) => {
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <ResultPartList formValues = {formValues} id = {id}/>,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane]
        setActiveKey(activeKey);
        c++;
        console.log(panes.current)
    };

    const addSGroup = (id, buttonName) => {
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: buttonName + " - " + "Parts Group List",
            content: <PartListGroup carid = {id} onAdd = {addSub} buttonName = {buttonName}/>,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane]
        setActiveKey(activeKey);
        c++;
        console.log(panes.current)
    };

    // const remove = (targetKey) => {
    //     const targetPaneIndex = panes.current.findIndex(pane => pane.key === targetKey);
    //     setActiveKey(targetKey);
    //     const newpanes.current = panes.current.filter(pane => pane.key !== targetKey);
    //     panes.current = newpanes.current;
    //     const newActiveKey = newpanes.current[targetPaneIndex - 1]?.key || newpanes.current[targetPaneIndex]?.key || "";
    //     setActiveKey(newActiveKey);
    //     console.log(newActiveKey)
    //   };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        panes.current.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const newpPanes = panes.current.filter((pane) => pane.key !== targetKey);
        if (newpPanes.length && newActiveKey === targetKey) {
          if (lastIndex >= 0) {
            newActiveKey = newpPanes[lastIndex].key;
          } else {
            newActiveKey = newpPanes[0].key;
          }
        }
        panes.current = newpPanes;
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
