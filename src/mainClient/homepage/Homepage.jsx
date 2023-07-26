import React, { useState } from "react";
import "./Homepage.scss";
import { Tabs } from "antd";
import { PartList } from "components/PartList/PartList";
import { AdminHeader } from "components/Header";
import { SearchCriteria } from "components/SearchCriteria";
import { SearchResult } from "components/SearchList"
import { ResultList } from "components/ResultList/ResultList";
import { PartSubgroup, PartGroup } from "components/PartGroup";
const { TabPane } = Tabs;

function Homepage() {
    const [sidebarOpen, setSideBarOpen] = useState(true);
    const [partSubName, setPartSubName] = useState("");

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
        const newTabIndex = panes.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <PartList carid={102} SubGroupName={buttonName} />,
            key: activeKey,
        };
        setPanes([...panes, newPane]);
        setActiveKey(activeKey);
    };

    const addSub = (buttonSubName) => {
        console.log(buttonSubName);
        const newTabIndex = panes.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: `KUN25, ${buttonSubName} group-Parts subgroup list`,
            content: (
                <PartSubgroup
                    carid={150}
                    partGroupName={buttonSubName}
                    onAdd={add}
                />
            ),
            key: activeKey,
        };
        setPartSubName(buttonSubName);
        setPanes([...panes, newPane]);
        setActiveKey(activeKey);
    };

    const [resultListPane, setResultListPane] = useState(null);
    
    const addGroup = (formValues, count) => { 
        
        console.log(formValues);
        let text = "Result List";
        if (count === 0) {
            text = "Vehicel Model List";
        }
        if (resultListPane) {
            // Tab ResultList đã được tạo, chỉ cập nhật nội dung của tab đó
            resultListPane.title = text;
            resultListPane.content = <ResultList formValues={formValues} count={count} Add={addList}/>;
            setPanes([...panes]);
            setActiveKey(resultListPane.key);
        } else {
            // Tab ResultList chưa được tạo, tạo một tab mới
            const newTabIndex = panes.length;
            const activeKey = `newTab${newTabIndex}`;
            const newPane = {
                title: text,
                content: <ResultList formValues={formValues} count={count} Add={addList}/>,
                key: activeKey,
            };
            setPanes([...panes, newPane]);
            setResultListPane(newPane);
            setActiveKey(activeKey);
            }
    };

    const addList = (buttonName) => {
        const newTabIndex = panes.length;
        const activeKey = `newTab${newTabIndex}`;
        const newPane = {
            title: "Part List",
            content: <PartList carid={102} SubGroupName={buttonName} />,
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
        setResultListPane(null)
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
                        {panes.map((pane) => (
                            <TabPane
                                tab={pane.title}
                                key={pane.key}
                                closable={pane.closable}
                            >
                                {pane.title === "Search Result" ? (
                                    <SearchResult />
                                ) : pane.title.includes("Parts group list") ? (
                                    <PartGroup carid={150} onAdd={addSub} />
                                ) : pane.title.includes(
                                      "Parts subgroup list"
                                  ) ? (
                                    <PartSubgroup
                                        carid={29}
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
