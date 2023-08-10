import React, { useState, useRef } from "react";
import "./Homepage.scss";
import { Tabs } from "antd";
import { PartList } from "components/PartList/PartList";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { SearchResult } from "components/SearchList";
import { ResultList } from "components/ResultList/ResultList";
import { PartSubgroup } from "components/PartGroup";
import { ResultPartList } from "components/ResultList/ResultPartList";
import { PartListGroup } from "components/ResultList/PartListGroup";

const initialItems = [
    {
        title: "Search Result",
        key: `0`,
        closable: false,
    },
];

const { TabPane } = Tabs;
let c = 1;
let removed = {status: false, key: "", title:"", special: ""};

function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(true);

    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const panes = useRef(initialItems);

    const onChange = (activeKey) => {
        setActiveKey(activeKey);
        console.log("Current Active Key: ", activeKey);
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
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
        c++;
        console.log("Current Panes: ", panes.current);
    };

    const addSub = (carid, buttonSubName) => {
        console.log("Part Subgroup Name: ", buttonSubName);
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
        // setPartSubName(buttonSubName);
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
        c++;
        console.log("Current Panes: ", panes.current);
    };

    const addGroup = (formValues, count) => {
        let counter = 0;
        let samepane = false;
        let text = "Result List";
        if (count === 0) {
            text = "Vehicle Model List";
        }
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: text,
            content: (
                <ResultList
                    formValues={formValues}
                    count={count}
                    Add={addList}
                    onAdd={addSGroup}
                />
            ),
            key: activeKey,
        };

        for (let i = 0; i<[...panes.current].length; i++) {
            if (([...panes.current][i].title === "Result List") || ([...panes.current][i].title === "Vehicle Model List")) {
                counter = i;
                samepane = true;
                remove([...panes.current][i].key);
                break;
            }
        }
        let newPanelist = [];
        if (samepane && [...panes.current].length > 0) {
            for (let i = 0; i <= [...panes.current].length; i++) {
                if (i<counter) {
                    if ([...panes.current][i].title!=="Search Result") {
                        newPanelist.push([...panes.current][i]);
                    }
                    continue;
                } else if (i===counter) {
                    newPanelist.push(newPane);
                    continue;
                } else if (i>counter) {
                    if ([...panes.current][i-1].title!=="Search Result") {
                        newPanelist.push([...panes.current][i-1]);
                    }
                    continue;
                }
            }
        } else if (samepane && [panes.current].length===0) {
            newPanelist = [...newPane];
        } else {
            newPanelist = [...panes.current, newPane];
        }
        panes.current = newPanelist;

        //Pre-change:
        // panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
        console.log("Current Panes: ", panes.current);
        c++;
    };

    const addList = (id, formValues) => {
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <ResultPartList formValues={formValues} id={id} />,
            key: activeKey,
        };
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
        c++;
        console.log("Current Panes: ", panes.current);
    };

    const addSGroup = (id, buttonName) => {
        const newTabIndex = c;
        const activeKey = `${newTabIndex}`;
        const newPane = {
            title: `${buttonName}  -  Parts Group List`,
            content: (
                <PartListGroup
                    carid={id}
                    onAdd={addSub}
                    buttonName={buttonName}
                />
            ),
            key: activeKey,
        };
        panes.current = [...panes.current, newPane];
        setActiveKey(activeKey);
        c++;
        console.log("Current Panes: ", panes.current);
    };

    const remove = (targetKey) => {
        let newActiveKey;
        if (activeKey !== targetKey) {
            newActiveKey = targetKey;
            setActiveKey(targetKey);
        } else {
            newActiveKey = activeKey;
        }
        let lastIndex = -1;
        panes.current.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
                if (pane.title === "Vehicle Model List" || pane.title === "Result List") {
                    removed.title = "Fitted";
                }
            }
        });
        var newpPanes = panes.current.filter(
            (pane) => pane.key !== targetKey
        );

        if (newpPanes.length === 0) {
            const SpawningIndex = 0;
            newActiveKey = `${SpawningIndex}`;
            const SpawnPane = {
                title: `Search Result`,
                content: (
                    <SearchResult />
                ),
                key: newActiveKey,
                closable: false
            }
            newpPanes.push(SpawnPane);
        } else if (newpPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newpPanes[lastIndex].key;
            } else {
                newActiveKey = newpPanes[0].key;
            }
        }
        panes.current = newpPanes;
        if (targetKey===activeKey) {
            setActiveKey(newActiveKey);
        } else {
        removed.status = true;
        removed.key = newActiveKey;
        }
    }

    if ([...panes.current][0].title === "Search Result" && [...panes.current].length > 1) {
        remove([...panes.current][0].key);
    }

    if (removed.status===true) {
        if (removed.title!=="Fitted") {
            setActiveKey(removed.key);
            removed.status = false;
            removed.key = "";
        } else if (removed.title==="Fitted") {
            if ([...panes.current].length===1) {
                setActiveKey([...panes.current][0].key);
            } else {
                var setted = false;
                for (let i = 0; i < [...panes.current].length; i++) {
                    if ([...panes.current][i].title === "Vehicle Model List" || [...panes.current][i].title === "Result List") {
                        setted = true;
                        setActiveKey([...panes.current][i].key);
                        break;
                    }
                }
                if (!setted) {
                    setActiveKey(removed.key);
                }
            }
            removed.status = false;
            removed.key = "";
            removed.title = "";
        }
    }

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
