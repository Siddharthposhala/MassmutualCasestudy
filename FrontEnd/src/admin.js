/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./body";
import React, { useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("newposts");
  const [isBlurBackground, setIsBlurBackground] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {user ? (
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
            <div className="w-5/6 ">
              <Dashboard
                activeTab={activeTab}
                isBlurBackground={isBlurBackground}
                setIsBlurBackground={setIsBlurBackground}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>hello</h1>
          {navigate("/")}
        </div>
      )}
    </div>
  );
};

export default Admin;
