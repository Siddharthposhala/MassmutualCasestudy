/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./body";
import React, { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("newposts");
  const [isBlurBackground, setIsBlurBackground] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <div className="w-1/6 ">
          <Sidebar
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            isBlurBackground={isBlurBackground}
          />
        </div>
        <div className="w-5/6 overflow-y-scroll">
          <Dashboard
            activeTab={activeTab}
            isBlurBackground={isBlurBackground}
            setIsBlurBackground={setIsBlurBackground}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
